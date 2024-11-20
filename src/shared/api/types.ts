export type TreeDto = {
    children: TreeDto[];
    id: number;
    name: string
}

export type CreateNodeData = {
    parentNodeId: number,
    nodeName: string
}

export type UpdateNodeData = {
    nodeId: number, newNodeName: string
}

export type DeleteNodeData = {
    nodeId: number
}
