import React, {ChangeEvent, FormEvent, useState} from "react";
import {TreeItem} from "../treeItem/TreeItem";
import {TreeNodeType} from "../../../shared/types";
import {AddNodeModal} from "../../../components/popup/AddNodeModal";
import {EditNodeModal} from "../../../components/popup/EditNodeModal";
import {DeleteNodeModal} from "../../../components/popup/DeleteNodeModal";
import {useCreateNode} from "../../../shared/hooks/use-create-node";
import {useDeleteNode} from "../../../shared/hooks/use-delete-node";
import {useUpdateNode} from "../../../shared/hooks/use-update-node";

type TreeNodeTypeProps = {
    node: TreeNodeType
    setSelectedNode: (node: TreeNodeType) => void;
    selectedNode: TreeNodeType | null;
}

export const TreeNode = ({
                             node,
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

    const {onCreateNode, isCreateNodePending} = useCreateNode(nodeName, selectedNode?.id)
    const {handleDeleteNode, isDeleteNodePending} = useDeleteNode(selectedNode?.id)
    const {handleUpdate, isUpdateNodePending} = useUpdateNode(newNodeName, selectedNode?.id)

    const handleShowChildren = () => {
        setShowChildren((prev) => !prev);
    };

    const handleAddNode = (e: FormEvent<HTMLFormElement>) => {
        onCreateNode(e);
        setNodeName('')
        setAddNodeModalIsOpen(false)
    }

    const handleEditNodeButtonClick = (e: FormEvent<HTMLFormElement>) => {
        if (newNodeName) {
            handleUpdate(e)
        }
        setNewNodeName('')
        setUpdateNodeModalIsOpen(false)
    }

    const handleDeleteNodeButtonClick = () => {
        handleDeleteNode();
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
                onAddButtonClick={handleAddNode}
                isLoading={isCreateNodePending}
            />

        }
        {updateNodeModalIsOpen &&
            <EditNodeModal
                isOpen={updateNodeModalIsOpen}
                setModal={setUpdateNodeModalIsOpen}
                inputValue={newNodeName}
                onChangeInputValue={handleChangeNewName}
                onEditButtonClick={handleEditNodeButtonClick}
                isLoading={isUpdateNodePending}
            />
        }
        {deleteNodeModalIsOpen &&
            <DeleteNodeModal isOpen={deleteNodeModalIsOpen}
                             setModal={setDeleteNodeModalIsOpen}
                             nodeName={name}
                             onDeleteButtonClick={handleDeleteNodeButtonClick}
                             isLoading={isDeleteNodePending}
            />
        }
    </div>
}