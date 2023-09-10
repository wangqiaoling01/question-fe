import React, { FC, useState } from 'react'
import styles from './index.module.scss'
import { useTitle } from 'ahooks'
import { Empty, Input, Space, Table, Tag, Typography, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../../components/ListSearch'
import useLoadQuestionListData from '../../../hook/useLoadQuestionListData'
import ListPage from '../../../components/ListPage'

const Trash: FC = () => {
    useTitle('问卷 - 回收站')

    const { data, loading } = useLoadQuestionListData({ isDeleted: true })

    const { list = [], total } = data

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
            },
        },
        {
            title: '答卷',
            dataIndex: 'answerCount',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
    ]

    const [selectedIds, setSelectedIds] = useState<string[] | []>([])

    const del = () => {
        Modal.confirm({
            title: '确认彻底删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            content: '删除后不可找回',
            onOk: () => {
                alert(`del JSON.stringify(selectedIds`)
            },
        })
    }

    const TableElem = () => (
        <>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                <Space>
                    <Button type="primary" disabled={!selectedIds.length}>
                        恢复
                    </Button>
                    <Button danger disabled={!selectedIds.length} onClick={del}>
                        彻底删除
                    </Button>
                </Space>
            </div>
            <Table
                dataSource={list}
                columns={columns}
                pagination={false}
                rowKey={q => q._id}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedIds,
                    onChange: keys => setSelectedIds(keys as string[]),
                }}
            />
        </>
    )
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Typography.Title level={3}>星标问卷</Typography.Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>

            <div className={styles.content}>
                {!list.length && <Empty description={'暂无数据'} />}

                {!!list.length && <TableElem />}
            </div>

            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </div>
    )
}
export default Trash
