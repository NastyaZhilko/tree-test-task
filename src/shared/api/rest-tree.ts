import {treeApi} from "./api";
import {CreateNodeData, DeleteNodeData, UpdateNodeData} from "./types";

export async function getTree() {
    const { data: tree } = await treeApi.getTree();
    return tree;
}

export async function treeNodeCreate(data: CreateNodeData) {
    await treeApi.treeNodeCreate(data);
}
export async function treeNodeUpdate(data: UpdateNodeData) {
    const { data: tree } = await treeApi.treeNodeEdit(data);
    return tree;
}
export async function treeNodeDelete(data: DeleteNodeData) {
    const { data: tree } = await treeApi.treeNodeDelete(data);
    return tree;
}