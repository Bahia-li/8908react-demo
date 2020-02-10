import React, { Component } from "react";
import { Radio, Table, Button, Card, message, Modal } from "antd";
import { connect } from "react-redux";
import {
  getRoleListAsync,
  addRoleAsync,
  updateRoleAsync
} from "$redux/actions";
import dayjs from "dayjs";

import RoleAddForm from "./role-add-form";
import RoleUpdateForm from "./role-update-form";

const { Group } = Radio;
@connect(
  state => ({ roles: state.roles, username: state.user.user.username }),
  {
    getRoleListAsync,
    addRoleAsync,
    updateRoleAsync
  }
)
class Role extends Component {
  state = {
    isLoading: false,
    isShowAddRoleModal: false,
    isShowUpdateRoleModal: false,
    role: {}
  };
  columns = [
    {
      // 注意：如果不写dataIndex就会报错。
      dataIndex: "_id",
      render: id => {
        return <Radio key={id} value={id} />;
      }
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: time => {
        //如果没有授权，time为undefined，不应该显示授权时间
        return time && dayjs(time).format("YYYY/MM/DD HH:mm:ss");
      }
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.props
      .getRoleListAsync()
      .then(() => {
        message.success("获取角色列表数据成功");
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  //显示modal对话框的状态(isShowAddRoleModal 显示添加对话框,isShowUpdateRoleModal 显示修改对话框)
  switchModal = () => {};

  //显示添加对话框
  switchAddModal = () => {
    this.setState({
      isShowAddRoleModal: true
    });
  };

  //隐藏添加对话框
  hiddenAddModal = () => {
    this.setState({
      isShowAddRoleModal: false
    });
  };

  //请求添加角色方法
  addRole = () => {
    const { validateFields, resetFields } = this.roleAddForm.props.form;

    validateFields((err, values) => {
      if (!err) {
        const { name } = values;

        this.props
          .addRoleAsync(name)
          .then(() => {
            message.success("添加角色成功！");
            //隐藏对话框
            this.hiddenAddModal();
            //清空表单
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  //显示修改角色对话框
  switchUpdateModal = () => {
    this.setState({
      isShowUpdateRoleModal: true
    });
  };

  //隐藏修改角色对话框
  hiddenUpdateModal = () => {
    this.setState({
      isShowUpdateRoleModal: false
    });
  };
  //请求修改角色权限方法
  UpdateRole = () => {
    const { validateFields, resetFields } = this.roleUpdateForm.props.form;

    validateFields((err, values) => {
      if (!err) {
        //获取menus
        const { menus } = values;
        //获取roleId
        const roleId = this.state.role._id;
        //获取授权人姓名
        const authName = this.props.username;

        this.props
          //menus需要转换成JSON格式的数据
          .updateRoleAsync({ menus: JSON.stringify(menus), roleId, authName })
          .then(response => {
            message.success("修改角色权限数据成功！");
            //关闭对话框
            this.setState({
              isShowUpdateRoleModal: false,
              //更新最新的状态值,逐渐Role才会更新
              role: response
            });
            //清空表单数据
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  //单选按钮事件
  handleRadioChange = e => {
    const id = e.target.value;
    const role = this.props.roles.find(role => {
      return role._id === id;
    });
    //更新状态
    this.setState({
      role
    });
  };

  render() {
    const {
      isLoading,
      isShowAddRoleModal,
      isShowUpdateRoleModal,
      role
    } = this.state;
    const { roles } = this.props;
    return (
      <Card
        title={
          <div>
            <Button type="primary" onClick={this.switchAddModal}>
              创建角色
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={this.switchUpdateModal}
              disabled={!role._id} //disabled  单选框没有选中 按钮不能点击
              // onClick={this.switchModal("isShowUpdateRoleModal", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <Group style={{ width: "100%" }} onChange={this.handleRadioChange}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            loading={isLoading}
            pagination={{
              //分页
              defaultPageSize: 5,
              pageSizeOptions: ["5", "10", "15"],
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
          <Modal
            title="创建角色"
            visible={isShowAddRoleModal}
            onOk={this.addRole}
            onCancel={this.hiddenAddModal}
          >
            <RoleAddForm
              //创出form给RoleAddForm组件
              wrappedComponentRef={form => (this.roleAddForm = form)}
            />
          </Modal>
          <Modal
            title="角色权限设置"
            visible={isShowUpdateRoleModal}
            onOk={this.UpdateRole}
            onCancel={this.hiddenUpdateModal}
          >
            <RoleUpdateForm
              wrappedComponentRef={form => (this.roleUpdateForm = form)}
              role={role}
            />
          </Modal>
        </Group>
      </Card>
    );
  }
}

export default Role;
