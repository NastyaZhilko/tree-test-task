import {axiosInstance} from "./axiosInstance";
import {CreateNodeData, DeleteNodeData, TreeDto, UpdateNodeData} from "./types";

export const ROOT_TREE_NAME = 'root-tree-14-11-2024'

export const treeApi = {
    getTree() {
        return axiosInstance.post<TreeDto>(`/api.user.tree.get/${ROOT_TREE_NAME}`);
    },
    treeNodeCreate(data: CreateNodeData) {
        const {parentNodeId, nodeName} = data;
        return axiosInstance.post(`/api.user.tree.node.create?treeName=${ROOT_TREE_NAME}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`
        )
    },
    treeNodeEdit(data: UpdateNodeData) {
        const {nodeId, newNodeName} = data;
        return axiosInstance.post(`/api.user.tree.node.rename?treeName=${ROOT_TREE_NAME}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
    },
    treeNodeDelete(data: DeleteNodeData) {
        const {nodeId} = data;
        return axiosInstance.post(`/api.user.tree.node.delete?treeName=${ROOT_TREE_NAME}&nodeId=${nodeId}`);
    },
};