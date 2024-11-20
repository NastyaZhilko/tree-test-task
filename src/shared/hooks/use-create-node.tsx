import {useMutation, useQueryClient} from "@tanstack/react-query";
import {treeNodeCreate} from "../api/rest-tree";
import React, {FormEvent} from "react";
import {alert} from "../components/popupAlert/PopupAlert";
import {IoIosSave} from "react-icons/io";
import {AxiosError} from "axios";
import {ErrorResponse} from "../types";

export const useCreateNode = (nodeName: string, id?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: treeNodeCreate,
        onSuccess: () => {
            alertCreateNodeSuccess()
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertCreatNodeError(axiosError.response?.data.data.message || 'An error occurred')
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['tree'],
            })
        }
    })


    const onCreateNode = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            mutation.mutate(
                {
                    parentNodeId: id, nodeName: nodeName.trim()
                }
            )
        }
    }
    return {
        onCreateNode,
        isCreateNodePending: mutation.isPending
    }
}

const alertCreateNodeSuccess = () => {
    alert.success(
        {
            title: 'Data added successfully'
        },
        {icon: <IoIosSave color='green' size={24}/>}
    );
};

const alertCreatNodeError = (message: string) => {
    alert.error(
        {
            title: 'Failed to add data',
            text: message,
        },
        {icon: <IoIosSave color='red' size={24}/>}
    );
};