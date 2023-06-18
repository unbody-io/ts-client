import {UnbodyDocumentTypeNames} from "./UnbodyDocumentTypeNames.types";
import {BaseObject} from "./BaseObject.types";
import {ImageBlock} from "./ImageBlock.types";
import {TextBlock} from "./TextBlock.types";
import {MentionItem, TocItem} from "./Fragments.types";

export interface GoogleDoc extends BaseObject {
    __typename: UnbodyDocumentTypeNames.GoogleDoc
    blocks: Array<ImageBlock | TextBlock>
    createdAt: string
    html: string
    mimeType: string
    modifiedAt: string
    originalName: string
    path: string[]
    pathString: string
    remoteId: string
    slug: string
    size: number
    sourceId: string
    subtitle: string
    summary: string
    tags: string[]
    text: string
    title: string
    toc: string | Array<TocItem>
    mentions: Array<MentionItem>
}
