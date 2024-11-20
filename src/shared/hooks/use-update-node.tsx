import {useMutation, useQueryClient} from "@tanstack/react-query";
import {treeNodeUpdate} from "../api/rest-tree";
import React, {FormEvent} from "react";
import {alert} from "../components/popupAlert/PopupAlert";
import {IoIosSave} from "react-icons/io";
import {AxiosError} from "axios";
import {ErrorResponse} from "../types";

export const useUpdateNode = (newNodeName: string, id?: number) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: treeNodeUpdate,
        onSuccess: () => {
            alertUpdateNodeSuccess()
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<ErrorResponse>;
                alertUpdateNodeError(axiosError.response?.data.data.message || 'An error occurred')
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['tree'],
            })
        }
    })


    const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            mutation.mutate(
                {
                    nodeId: id, newNodeName: newNodeName.trim()
                }
            )
        }
    }
    return {
        handleUpdate,
        isUpdateNodePending: mutation.isPending
    }
}

const alertUpdateNodeSuccess = () => {
    alert.success(
        {
            title: 'Data updated successfully'
        },
        {icon: <IoIosSave color='green' size={24}/>}
    );
};

const alertUpdateNodeError = (message: string) => {
    alert.error(
        {
            title: 'Failed to update data',
            text: message,
        },
        {icon: <IoIosSave color='red' size={24}/>}
    );
};