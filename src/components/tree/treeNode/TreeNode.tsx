import React, {ChangeEvent, useState} from "react";
import {TreeItem} from "../treeItem/TreeItem";
import Modal from "../../../shared/components/modal/Modal";
import {Loader} from "../../../shared/components/loader/Loader";
import styles from "../treeItem/TreeItem.module.scss";
import {Input} from "../../../shared/components/input/Input";
import {Button} from "../../../shared/components/button/Button";
import {TreeNodeType} from "../../../shared/types";
import {AddNodeModal} from "../../popup/AddNodeModal";
import {EditNodeModal} from "../../popup/EditNodeModal";
import {DeleteNodeModal} from "../../popup/DeleteNodeModal";

type TreeNodeTypeProps = {
    node: TreeNodeType
    isLoading: boolean
    addNode: (nodeName: string) => void
    editNode: (newNodeName: string) => void
    deleteNode: () => void
    setSelectedNode: (node: TreeNodeType) => void;
    selectedNode: TreeNodeType | null;
}

export const TreeNode = ({
                             node,
                             isLoading,
                             addNode,
                             editNode,
                             deleteNode,
                             setSelectedNode,
                             selectedNode,
                         }: TreeNodeTypeProps) => {
    const {
        id,
        name,
        children
    } = node

    const [nodeName, setNodeName] = useState<string>('');
    const [newNodeName, setNewNodeName] = useState(name);

    const [showChildren, setShowChildren] = useState(false);

    const [addNodeModalIsOpen, setAddNodeModalIsOpen] = useState(false);
    const [updateNodeModalIsOpen, setUpdateNodeModalIsOpen] = useState(false);
    const [deleteNodeModalIsOpen, setDeleteNodeModalIsOpen] = useState(false);

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNodeName(e.target.value);
    }

    const handleChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNodeName(e.target.value);
    }

    const handleShowChildren = () => {
        setShowChildren((prev) => !prev);
    };

    const handleAddNodeButtonClick = () => {
        addNode(nodeName);
        setNodeName('')
        setAddNodeModalIsOpen(false)
    }

    const handleEditNodeButtonClick = () => {
        if (newNodeName) {
            editNode(newNodeName)
        }
        setNewNodeName('')
        setUpdateNodeModalIsOpen(false)
    }

    const handleDeleteNodeButtonClick = () => {
        deleteNode()
        setDeleteNodeModalIsOpen(false)
    }

    return <div>
        <TreeItem node={node}
                  showChildren={showChildren}
                  setShowChildren={handleShowChildren}
                  hasChildren={children.length > 0}
                  addNodeButtonClick={setAddNodeModalIsOpen}
                  updateNodeButtonClick={setUpdateNodeModalIsOpen}
                  deleteNodeButtonClick={setDeleteNodeModalIsOpen}
                  isSelected={selectedNode?.id === id}
                  onSelect={setSelectedNode}
        />
        {showChildren && children && <div style={{marginLeft: '24px'}}>
            {children.map((child: TreeNodeType) =>
                <TreeNode
                    key={child.id}
                    node={child}
                    isLoading={isLoading}
                    addNode={addNode}
                    editNode={editNode}
                    deleteNode={deleteNode}
                    setSelectedNode={setSelectedNode}
                    selectedNode={selectedNode}
                />)}
        </div>}
        {addNodeModalIsOpen &&
            <AddNodeModal
                isOpen={addNodeModalIsOpen}
                setModal={setAddNodeModalIsOpen}
                inputValue={nodeName}
                onChangeInputValue={handleChangeName}
                onAddButtonClick={handleAddNodeButtonClick}
                isLoading={isLoading}
            />

        }
        {updateNodeModalIsOpen &&
            <EditNodeModal
                isOpen={updateNodeModalIsOpen}
                setModal={setUpdateNodeModalIsOpen}
                inputValue={newNodeName}
                onChangeInputValue={handleChangeNewName}
                onEditButtonClick={handleEditNodeButtonClick}
                isLoading={isLoading}
            />
        }
        {deleteNodeModalIsOpen &&
            <DeleteNodeModal isOpen={deleteNodeModalIsOpen}
                             setModal={setDeleteNodeModalIsOpen}
                             nodeName={name}
                             onDeleteButtonClick={handleDeleteNodeButtonClick}
                             isLoading={isLoading}
            />
        }
    </div>
}