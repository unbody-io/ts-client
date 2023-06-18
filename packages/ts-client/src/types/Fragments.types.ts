export interface TocItem {
    tag: string
    blockIndex: number
    href: string
    title: string
    level: number
}

export interface MentionItem {
    name: string
    emailAddress: string
}

export interface FootnoteItem {
    id: string
    index: number
    refId: string
    refValue: string
    valueHTML: string
}
