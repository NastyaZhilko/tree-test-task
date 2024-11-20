import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getTree} from "../api/rest-tree";

export const useTree = () => {
   const {data: treeData, error, isLoading, isPlaceholderData} =
    useQuery({
        queryKey: ['tree'],
        queryFn: getTree,
        placeholderData: keepPreviousData
    })
    return {treeData, error, isLoading, isPlaceholderData}
}