import React, { FC, useEffect } from 'react'
import { QuestionTitleProps } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'

export const PropComponent: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
    const { level, text, isCenter, onChange } = props

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ level, text, isCenter })
    }, [level, text, isCenter])

    const onValuesChange = () => {
        onChange?.(form.getFieldsValue())
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ level, text, isCenter }}
            onValuesChange={onValuesChange}
            form={form}
        >
            <Form.Item
                name={'text'}
                label="标题内容"
                rules={[{ required: true, message: '请输入标题内容' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={'level'} label="层级">
                <Select
                    options={[
                        { value: 1, text: 1 },
                        { value: 2, text: 2 },
                        { value: 3, text: 3 },
                    ]}
                ></Select>
            </Form.Item>
            <Form.Item name={'isCenter'} valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}
