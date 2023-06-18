import {UnbodyDocumentTypeNames} from "./UnbodyDocumentTypeNames.types";
import {BaseObject} from "./BaseObject.types";
import {ImageBlock} from "./ImageBlock.types";

export interface GoogleCalendarEvent extends BaseObject {
    __typename: UnbodyDocumentTypeNames.GoogleCalendarEvent
    createdAt: string
    creatorDisplayName: string
    creatorEmail: string
    creatorId: string
    creatorSelf: boolean
    descriptionHtml: string
    descriptionText: string
    end: string
    htmlLink: string
    location: string
    organizerDisplayName: string
    organizerEmail: string
    organizerId: string
    organizerSelf: boolean
    recurrence: string[]
    slug: string
    remoteId: string
    sequence: number
    sourceId: string
    start: string
    status: string
    summary: string
    title: string
    updatedAt: string
    modifiedAt: string
    attachments: Array<ImageBlock>
}
