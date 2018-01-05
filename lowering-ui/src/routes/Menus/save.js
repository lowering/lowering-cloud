import React from 'react';
import { Card, Form, Button, Input, InputNumber, Radio, DatePicker, Select, Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import OverviewLayout from "../../layouts/OverviewLayout";
import styles from './save.less';

class Save extends React.PureComponent {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };
    render() {
        const { submitting } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <OverviewLayout title="基础表单" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
                <Card bordered={false}>
                    <Form
                        onSubmit={this.handleSubmit}
                        hideRequiredMark
                        style={{ marginTop: 8 }}
                    >
                        <Form.Item
                            {...formItemLayout}
                            label="标题"
                        >
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true, message: '请输入标题',
                                }],
                            })(
                                <Input placeholder="给目标起个名字" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="起止日期"
                        >
                            {getFieldDecorator('date', {
                                rules: [{
                                    required: true, message: '请选择起止日期',
                                }],
                            })(
                                <DatePicker.RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="目标描述"
                        >
                            {getFieldDecorator('goal', {
                                rules: [{
                                    required: true, message: '请输入目标描述',
                                }],
                            })(
                                <Input.TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="衡量标准"
                        >
                            {getFieldDecorator('standard', {
                                rules: [{
                                    required: true, message: '请输入衡量标准',
                                }],
                            })(
                                <Input.TextArea style={{ minHeight: 32 }} placeholder="请输入衡量标准" rows={4} />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={
                                <span>
                  客户
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="目标的服务对象">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
                            }
                        >
                            {getFieldDecorator('client')(
                                <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={<span>邀评人<em className={styles.optional}>（选填）</em></span>}
                        >
                            {getFieldDecorator('invites')(
                                <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={<span>权重<em className={styles.optional}>（选填）</em></span>}
                        >
                            {getFieldDecorator('weight')(
                                <InputNumber placeholder="请输入" min={0} max={100} />
                            )}
                            <span>%</span>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="目标公开"
                            help="客户、邀评人默认被分享"
                        >
                            <div>
                                {getFieldDecorator('public', {
                                    initialValue: '1',
                                })(
                                    <Radio.Group>
                                        <Radio value="1">公开</Radio>
                                        <Radio value="2">部分公开</Radio>
                                        <Radio value="3">不公开</Radio>
                                    </Radio.Group>
                                )}
                                <Form.Item>
                                    {getFieldDecorator('publicUsers', {
                                    })(
                                        <Select
                                            mode="multiple"
                                            placeholder="公开给"
                                            style={{
                                                margin: '8px 0',
                                                display: getFieldValue('public') === '2' ? 'block' : 'none',
                                            }}
                                        >
                                            <Select.Option value="1">同事甲</Select.Option>
                                            <Select.Option value="2">同事乙</Select.Option>
                                            <Select.Option value="3">同事丙</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </Form.Item>
                        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                提交
                            </Button>
                            <Button style={{ marginLeft: 8 }}>保存</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </OverviewLayout>
        );
    }
}

export default connect(({menu})=>({menu}))(Form.create()(Save));
