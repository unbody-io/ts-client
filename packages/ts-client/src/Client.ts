import axios, {AxiosInstance} from "axios";
import {
    ClassType,
    Filters,
    GoogleCalendarEvent,
    GoogleDoc,
    ImageBlock, QueryResponseType,
    QueryType,
    TextBlock, Txt2VecC11yNearTextInpObj, UnbodyResponse,
    WhereInpObj
} from "./types";
import {createQueryGenerator, WhereOperandsClass} from "./utils";
interface UnbodyGetFilters extends Filters {}

class Operation {
    constructor(private operation: QueryType, private client: UnbodyClient) {}
    public gdoc = new Entity<GoogleDoc[]>('GoogleDoc', this.operation, this.client);
    public gcal = new Entity<GoogleCalendarEvent[]>('GoogleCalEvent', this.operation, this.client);
    public imageBlocks = new Entity<ImageBlock[]>('ImageBlock', this.operation, this.client);
    public textBlocks = new Entity<TextBlock[]>('TextBlock', this.operation, this.client);
}
class Entity<T> {
    protected args: UnbodyGetFilters = {};
    protected fields: string[] = [];
    protected limitValue: number | undefined;

    constructor(private classType: ClassType, private operation: QueryType, private client: UnbodyClient) {}

    where(args: WhereInpObj) {
        this.args.where = args;
        return this;
    }

    nearText(args: Txt2VecC11yNearTextInpObj) {
        this.args.nearText = args;
        return this;
    }

    select(...args: string[]) {
        this.fields = args;
        return this;
    }

    limit(limit: number) {
        this.args.limit = limit;
        return this;
    }

    async exec() {
        const queryFn = createQueryGenerator(this.classType, this.operation);
        const query = queryFn(this.args)(this.fields.join(','));
        return this.client.request<T, QueryType, ClassType>(query, this.operation, this.classType);
    }
}

export class UnbodyClient {
    public client: AxiosInstance;
    public get: Operation;
    public aggregate: Operation;
    public Where = WhereOperandsClass;

    static UNBODY_GRAPHQL_ENDPOINT = 'https://graphql.unbody.io';

    constructor(apiKey: string | undefined, projectId: string | undefined) {
        if (!apiKey) throw new Error('Unbody client: apiKey is required')
        if (!projectId) throw new Error('Unbody client: projectId is required')

        this.client = axios.create({
            baseURL: UnbodyClient.UNBODY_GRAPHQL_ENDPOINT,
            headers: {
                Authorization: apiKey,
                'X-Project-id': projectId,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        this.get = new Operation(QueryType.Get, this);
        this.aggregate = new Operation(QueryType.Aggregate, this);
    }

    async request<T, OP extends QueryType, DT extends ClassType>(query: string, operation: OP, classType: DT): Promise<UnbodyResponse<T>> {
        try {
            const response = await this.client.post<QueryResponseType<T, OP, DT>>('', { query });
            const data = (response.data.data as Record<OP, Record<DT, T>>)[operation][classType];
            return { data, error: null };
        } catch (error) {
            return { data: null, error: this.handleError(error) };
        }
    }

    handleError(error: any) {
        return error;
    }
}
