import {axiosInstance} from "./axiosInstance";
import {TreeResponseDataType} from "./types";

export const ROOT_TREE_NAME = 'root-tree-14-11-2024'

export const treeApi = {
    getTree() {
        return axiosInstance.post<TreeResponseDataType>(`/api.user.tree.get/${ROOT_TREE_NAME}`);
    },
    treeNodeCreate(parentNodeId: number, nodeName: string) {
        return axiosInstance.post<never>(`/api.user.tree.node.create?treeName=${ROOT_TREE_NAME}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`
        )
    },
    treeNodeEdit(nodeId: number, newNodeName: string) {
        return axiosInstance.post<never>(`/api.user.tree.node.rename?treeName=${ROOT_TREE_NAME}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
    },
    treeNodeDelete( nodeId: number) {
        return axiosInstance.post<never>(`/api.user.tree.node.delete?treeName=${ROOT_TREE_NAME}&nodeId=${nodeId}`);
    },
};