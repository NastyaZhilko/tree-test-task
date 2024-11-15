import React, {useEffect, useState} from 'react';
import {getTree, treeNodeCreate, treeNodeDelete, treeNodeUpdate} from "../../../api/rest/tree";
import {TreeNode} from "../treeNode/TreeNode";
import {AxiosError} from "axios";
import {alert} from "../popupAlert/PopupAlert";
import {IoIosSave} from "react-icons/io";
import {ErrorResponse, TreeNodeType} from "../../types";

export const Tree = () => {
    useEffect(() => {
        getTreeData()
    }, []);

    const [tree, setTree] = useState<TreeNodeType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<TreeNodeType | null>(null);

    const getTreeData = async () => {
        setIsLoading(true);
        try {
            const data = await getTree()
            setTree(data)
        } catch (error) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertErrorSuccess(axiosError.response?.data.data.message || 'An error occurred')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const addNode = async (nodeName: string) => {
        setIsLoading(true);
        try {
            if (selectedNode) {
                await treeNodeCreate(selectedNode.id, nodeName)
                alertSaveSuccess();
                await getTreeData();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertErrorSuccess(axiosError.response?.data.data.message || 'An error occurred')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const editNode = async (newNodeName: string) => {
        setIsLoading(true);
        try {
            if (selectedNode) {
                await treeNodeUpdate(selectedNode.id, newNodeName)
                alertSaveSuccess();
                await getTreeData();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertErrorSuccess(axiosError.response?.data.data.message || 'An error occurred')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const deleteNode = async () => {
        console.log(selectedNode)
        setIsLoading(true);
        try {
            if (selectedNode) {
                await treeNodeDelete(selectedNode.id)
            }
            alertDeleteSuccess();
            await getTreeData();
        } catch (error) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertErrorSuccess(axiosError.response?.data.data.message || 'An error occurred')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const alertSaveSuccess = () => {
        alert.success(
            {
                title: 'Данные успешно сохранены'
            },
            {icon: <IoIosSave color='green' size={24}/>}
        );
    };

    const alertDeleteSuccess = () => {
        alert.success(
            {
                title: 'Данные успешно удалены'
            },
            {icon: <IoIosSave color='green' size={24}/>}
        );
    };

    const alertErrorSuccess = (message: string) => {
        alert.error(
            {
                title: 'Не удалось сохранить данные',
                text: message,
            },
            {icon: <IoIosSave color='red' size={24}/>}
        );
    };
    return <div>
        {tree &&
            <TreeNode
                node={tree}
                isLoading={isLoading}
                addNode={addNode}
                editNode={editNode}
                deleteNode={deleteNode}
                setSelectedNode={setSelectedNode}
                selectedNode={selectedNode}
            />
        }
    </div>
}
