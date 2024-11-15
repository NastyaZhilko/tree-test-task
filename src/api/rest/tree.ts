import {treeApi} from "../client";

export async function getTree() {
    const { data: tree } = await treeApi.getTree();
    return tree;
}

export async function treeNodeCreate(parentNodeId: number, nodeName: string) {
    const { data: tree } = await treeApi.treeNodeCreate(parentNodeId, nodeName);
    return tree;
}
export async function treeNodeUpdate(nodeId: number, newNodeName: string) {
    const { data: tree } = await treeApi.treeNodeEdit(nodeId, newNodeName);
    return tree;
}
export async function treeNodeDelete(nodeId: number) {
    const { data: tree } = await treeApi.treeNodeDelete(nodeId);
    return tree;
}