import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import Footer from '../../components/Footer';
import Wrapper from '../../components/Wrapper';
import logo from '../../assets/logo.svg';
import styles from './index.less';

class Login extends React.PureComponent {

    state = {
        count: 0,
        type: 'account',
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onSwitch = (type) => {
        this.setState({ type });
    }

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields({ force: true },
            (err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type: 'login/login',
                        payload: {
                            ...values,
                            type: this.state.type,
                        },
                    });
                }
            }
        );
    }

    renderMessage = (message) => {
        return (
            <Alert
                style={{ marginBottom: 24 }}
                message={message}
                type="error"
                showIcon
            />
        );
    }

    render() {
        const { form, login } = this.props;
        const { getFieldDecorator } = form;
        const { count, type } = this.state;
        return (
            <Wrapper>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    <div className={styles.main}>
                        <Form onSubmit={this.handleSubmit}>
                            <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
                                <Tabs.TabPane tab="账户密码登录" key="account">
                                    {
                                        login.status === 'error' &&
                                        login.type === 'account' &&
                                        login.submitting === false &&
                                        this.renderMessage('账户或密码错误')
                                    }
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{
                                                required: type === 'account', message: '请输入账户名！',
                                            }],
                                        })(
                                            <Input
                                                size="large"
                                                prefix={<Icon type="user" className={styles.prefixIcon} />}
                                                placeholder="用户名"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: type === 'account', message: '请输入密码！',
                                            }],
                                        })(
                                            <Input
                                                size="large"
                                                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                                                type="password"
                                                placeholder="密码"
                                            />
                                        )}
                                    </Form.Item>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="手机号登录" key="mobile">
                                    {
                                        login.status === 'error' &&
                                        login.type === 'mobile' &&
                                        login.submitting === false &&
                                        this.renderMessage('验证码错误')
                                    }
                                    <Form.Item>
                                        {getFieldDecorator('mobile', {
                                            rules: [{
                                                required: type === 'mobile', message: '请输入手机号！',
                                            }, {
                                                pattern: /^1\d{10}$/, message: '手机号格式错误！',
                                            }],
                                        })(
                                            <Input
                                                size="large"
                                                prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                                                placeholder="手机号"
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Row gutter={8}>
                                            <Col span={16}>
                                                {getFieldDecorator('captcha', {
                                                    rules: [{
                                                        required: type === 'mobile', message: '请输入验证码！',
                                                    }],
                                                })(
                                                    <Input
                                                        size="large"
                                                        prefix={<Icon type="mail" className={styles.prefixIcon} />}
                                                        placeholder="验证码"
                                                    />
                                                )}
                                            </Col>
                                            <Col span={8}>
                                                <Button
                                                    disabled={count}
                                                    className={styles.getCaptcha}
                                                    size="large"
                                                    onClick={this.onGetCaptcha}
                                                >
                                                    {count ? `${count} s` : '获取验证码'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Tabs.TabPane>
                            </Tabs>
                            <Form.Item className={styles.additional}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
                                )}
                                <a className={styles.forgot} href="">忘记密码</a>
                                <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className={styles.other}>
                            其他登录方式
                            {/* 需要加到 Icon 中 */}
                            <span className={styles.iconAlipay} />
                            <span className={styles.iconTaobao} />
                            <span className={styles.iconWeibo} />
                            <Link className={styles.register} to="/user/register">注册账户</Link>
                        </div>
                    </div>
                    <Footer
                        className={styles.footer}
                        links={
                            [{
                                title: '帮助',
                                href: '',
                            }, {
                                title: '隐私',
                                href: '',
                            }, {
                                title: '条款',
                                href: '',
                            }]
                        }

                        copyright = {
                            <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>
                        }

                    />
                </div>
            </Wrapper>
        );
    }
}

export default connect(({login})=>({login}))(Form.create()(Login));
