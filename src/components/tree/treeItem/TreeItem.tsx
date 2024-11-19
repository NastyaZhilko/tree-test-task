import React from "react";
import styles from "./TreeItem.module.scss"
import {IoMdArrowDropright} from "react-icons/io";
import {IoIosAddCircle} from "react-icons/io";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {BiSolidTrash} from "react-icons/bi";
import {ROOT_TREE_NAME} from "../../../api/client";
import {TreeNodeType} from "../../../shared/types";
import classNames from "classnames";

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

    return (<div onClick={() => onSelect(node)} className={styles.itemContainer}>
        {hasChildren &&
            <IoMdArrowDropright onClick={setShowChildren} size={24}
                                className={classNames(styles.icon, styles.arrowIcon, {[styles.showChildren]: showChildren})}/> }
        <div className={styles.nodeName}>{node.name}</div>
        {isSelected && <div className={styles.actionsButton}>
            <IoIosAddCircle onClick={handleAddNodeButtonClick} className={classNames(styles.icon, styles.addIcon)}
                            size={24}/>
            {ROOT_TREE_NAME !== node.name && <><MdDriveFileRenameOutline onClick={handleEditNodeButtonClick}
                                                                         className={classNames(styles.icon, styles.editIcon)}
                                                                         size={24}/>
                <BiSolidTrash onClick={handleDeleteNodeButtonClick}
                              className={classNames(styles.icon, styles.deleteIcon)} size={20}/> </>}
        </div>}
    </div>)
}