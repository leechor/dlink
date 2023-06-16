import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import { Node } from '@antv/x6';

import { ParametersConfigType } from '../../views/home/cpns/left-editor';
import PortForm from "./port-form";
import CpnShape from "../cpn-shape"


interface FormContextValue {
    resetForm: () => void;
}
const NORMAL_MODAL_OPTIONS = {
    width: "50%",
    bodyStyle: { padding: "20px 30px 10px" },
    destroyOnClose: true,
    maskClosable: false,
};

type PortModalProps = {
    onCancel: (flag?: boolean) => void;
    onSubmit: (values: string) => void;
    modalVisible: boolean;
    values: ParametersConfigType[];
    selectedNode: Node;
};

const PortModalForm: React.FC<PortModalProps> = (props) => {

    /**
     * init form
     */
    const [form] = Form.useForm();
    /**
     * init form context
     */
    const formContext = React.useMemo<FormContextValue>(() => ({
        resetForm: () => form.resetFields(), // 定义 resetForm 方法
    }), [form]);

    /**
     * init props
     */
    const {
        onSubmit: handleSubmit,
        onCancel: handleModalVisible,
        modalVisible,
        values,
        selectedNode,
    } = props;
    const initValue = values.filter(value => value.flag).map(value => value.name)
    /**
     * when modalVisible or values changed, set form values
     */
    useEffect(() => {
        form.setFieldsValue(values);
    }, [modalVisible, values, form]);

    /**
     * handle cancel
     */
    const handleCancel = () => {
        handleModalVisible();
        formContext.resetForm();
    }
    /**
     * submit form
     */
    const submitForm = async () => {
        const fieldsValue = await form.validateFields();
        await handleSubmit({ origin:[...values],...fieldsValue});
        await handleCancel();
    };

    const TitleByNodeType = () => {
        if (!selectedNode.shape) {
            return <span style={{ paddingLeft: "5px" }}>{selectedNode.shape}</span>
        }
        if (selectedNode?.shape.includes("Mysql")) {
            return <>
                <CpnShape iconPath='icon-MySQL-icon-02' />
                <span style={{ paddingLeft: "5px" }}>{selectedNode.shape}</span>
            </>
        } else if (selectedNode?.shape.includes("Operator")) {
            return <>
                <CpnShape iconPath='icon-operator' />
                <span style={{ paddingLeft: "5px" }}>{selectedNode.shape}</span>
            </>
        }

    }
    /**
     * render
     */
    return <>
        <Modal
            {...NORMAL_MODAL_OPTIONS}
            title={selectedNode && TitleByNodeType()}
            open={modalVisible}
            onCancel={() => handleCancel()}
            onOk={() => submitForm()}
        >
            <PortForm form={form} values={values} initValue={values.filter(value => value.flag).map(value => value.name)} />
        </Modal>
    </>

};
export default PortModalForm;
