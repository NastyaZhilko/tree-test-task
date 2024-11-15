import React, {ChangeEvent, useState} from "react";
import {TreeItem} from "../treeItem/TreeItem";
import Modal from "../modal/Modal";
import {Loader} from "../loader/Loader";
import styles from "../treeItem/TreeItem.module.scss";
import {Input} from "../input/Input";
import {Button} from "../button/Button";
import {TreeNodeType} from "../../types";

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
            (<Modal modal={addNodeModalIsOpen} setModal={() => setAddNodeModalIsOpen(false)}>
                    {isLoading ? <Loader/> : <div className={styles.form}>
                        <h2>Add</h2>
                        <Input placeholder='Node Name' value={nodeName} onChange={handleChangeName} id='node-name'/>
                        <div className={styles.buttons}>
                            <Button onClick={() => setAddNodeModalIsOpen(false)} name='Cancel' variant='red'/>
                            <Button onClick={handleAddNodeButtonClick} name='Add' variant='blue'/>
                        </div>
                    </div>}
                </Modal>
            )}
        {updateNodeModalIsOpen && (
            <Modal modal={updateNodeModalIsOpen} setModal={() => setUpdateNodeModalIsOpen(false)}>
                {isLoading ? <Loader/> : <div>
                    <h2>Rename</h2>
                    <Input placeholder='New node name' value={newNodeName} onChange={handleChangeNewName}
                           id='new-node-name'/>
                    <div className={styles.buttons}>
                        <Button onClick={() => setUpdateNodeModalIsOpen(false)} name='Cancel' variant='red'/>
                        <Button onClick={handleEditNodeButtonClick} name='Rename' variant='blue'/>
                    </div>
                </div>}
            </Modal>
        )}
        {deleteNodeModalIsOpen && <Modal modal={deleteNodeModalIsOpen} setModal={() => setDeleteNodeModalIsOpen(false)}>
            {isLoading ? <Loader/> : <div className={styles.form}>
                <h2>Do you want to delete {name}</h2>
                <div className={styles.buttons}>
                    <Button onClick={() => setDeleteNodeModalIsOpen(false)} name='Cancel' variant='red'/>
                    <Button onClick={handleDeleteNodeButtonClick} name='Delete' variant='blue'/>
                </div>
            </div>}
        </Modal>}
    </div>
}