import {GoogleCalendarEvent, GoogleDoc, ImageBlock, QueryType, TextBlock} from "../types";
import {UnbodyClient} from "./Client.class";
import {Entity} from "./Entity.class";

export class Operation {
    constructor(private operation: QueryType, private client: UnbodyClient) {}

    public gdoc = new Entity<GoogleDoc[]>('GoogleDoc', this.operation, this.client);
    public gcal = new Entity<GoogleCalendarEvent[]>('GoogleCalEvent', this.operation, this.client);
    public imageBlocks = new Entity<ImageBlock[]>('ImageBlock', this.operation, this.client);
    public textBlocks = new Entity<TextBlock[]>('TextBlock', this.operation, this.client);
}
