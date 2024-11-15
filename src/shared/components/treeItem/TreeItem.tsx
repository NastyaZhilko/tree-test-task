import React from "react";
import styles from "./TreeItem.module.scss"
import {IoMdArrowDropright} from "react-icons/io";
import {IoMdArrowDropdown} from "react-icons/io";
import {IoIosAddCircle} from "react-icons/io";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {BiSolidTrash} from "react-icons/bi";
import {ROOT_TREE_NAME} from "../../../api/client";
import {TreeNodeType} from "../../types";

type TreeItemPropsType = {
    node: TreeNodeType;
    showChildren: boolean
    setShowChildren: () => void;
    hasChildren: boolean;
    addNodeButtonClick: (value: boolean) => void;
    updateNodeButtonClick: (value: boolean) => void;
    deleteNodeButtonClick: (value: boolean) => void;
    isSelected: boolean;
    onSelect: (node: TreeNodeType) => void;
}

export const TreeItem = ({
                             node,
                             showChildren,
                             setShowChildren,
                             hasChildren,
                             addNodeButtonClick,
                             updateNodeButtonClick,
                             deleteNodeButtonClick,
                             isSelected,
                             onSelect
                         }: TreeItemPropsType) => {

    const handleAddNodeButtonClick = () => {
        addNodeButtonClick(true)
    }

    const handleEditNodeButtonClick = () => {
        updateNodeButtonClick(true)
    }

    const handleDeleteNodeButtonClick = () => {
        deleteNodeButtonClick(true)
    }

    return (<div onClick={()=>onSelect(node)} className={styles.itemContainer}>
        {hasChildren && <div className={styles.arrowIcon}>{showChildren ?
            <IoMdArrowDropright onClick={setShowChildren} size={24}/> :
            <IoMdArrowDropdown onClick={setShowChildren} size={24}/>}</div>}
        <div>{node.name}</div>
        {isSelected && <div className={styles.actionsButton}>
            <IoIosAddCircle onClick={handleAddNodeButtonClick} className={styles.addIcon} size={24}/>
            {ROOT_TREE_NAME!==node.name && <><MdDriveFileRenameOutline onClick={handleEditNodeButtonClick} className={styles.addIcon}
                                      size={24}/>
            <BiSolidTrash onClick={handleDeleteNodeButtonClick} className={styles.deleteIcon} size={20}/> </>}
        </div>}
    </div>)
}