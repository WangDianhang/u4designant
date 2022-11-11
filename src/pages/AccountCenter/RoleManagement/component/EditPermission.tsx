import React, { useState, useEffect } from 'react';
import {
  message,
  Form,
  Tree,
  Checkbox,
} from 'antd';
import ProForm, { ModalForm, } from '@ant-design/pro-form';
import { setMenuTree } from '../service';
type EditPermissionitems = {

}
const EditPermission: React.FC<EditPermissionitems> = props => {
  const FormItem = Form.Item;
  const { TreeNode } = Tree;
  const [form] = Form.useForm();
  const { menu = [], getList, id, detail, tbutton = [], buttondetail } = props;
  const [dad, setTree] = useState(detail ? detail : []);
  const [but, setBut] = useState(buttondetail ? buttondetail : []);
  const [checkbox, setCheckbox] = useState([]);
  const [butcheckbox, setButcheckbox] = useState([]);
  const [checkboxboolean, setCheckboxboolean] = useState();
  const [checkboxbutboolean, setCheckboxbutboolean] = useState();
  useEffect(() => {
    handBox(menu);
    handbutBox(tbutton);
    setTree(detail);
    endCheckbox(detail);
    butendCheckbox(buttondetail);


    // setBut(buttondetail);

  }, [menu, detail, dad]);
  // 渲染树
  const menuMap = (datas: any) => {
    if (datas.length > 1) {
      return datas.map(item => (
        <TreeNode key={item.id} value={item.id} title={item.name}>
          {menuChirdenmap(item)}
        </TreeNode>
      ));
    }
  };
  const menuChirdenmap = (params: any) => {
    return params.submenu && params.submenu.length >= 1 ? (
      params.submenu.map((val: any) => (
        <TreeNode previousId={val.previousId} key={val.id} value={val.id} title={val.name}>
          {menuChirdenmap(val)}
        </TreeNode>
      ))
    ) : (
      <TreeNode
        previousId={params.previousId}
        id={params.id}
        key={params.button}
        value={params.button}
        title={`按钮操作权限`}
      ></TreeNode>
    );
  };
  const treeSet = () => {
    for (let i = 0; i < dad.length; i++) {
      for (let j = i + 1; j < dad.length; j++) {
        if (dad[i] === dad[j]) {
          dad.splice(j, 1);
          j--;
        }
      }
    }
  };
  // 选项自定义联动
  const handCheckedkeys = (checkedKeys: any) => {
    console.log(checkedKeys)
    const pushnodeId = (params: any[]) => {
      params.forEach(item => {
        dad.push(String(item.value));
        if (item.children) {
          pushnodeId(item.children);
        }
      });
    };
    const remove = (val: string) => {
      for (var i = 0; i < dad.length; i++) {
        if (dad[i] == val) {
          dad.splice(i, 1);
        }
      }
    };
    const removenodeId = (params: any[]) => {
      params.forEach(item => {
        remove(String(item.value));
        if (item.children) {
          removenodeId(item.children);
        }
      });
    };
    if (checkedKeys.checked) {
      dad.push(String(checkedKeys.node.value));
      if (checkedKeys.node.previousId) {
        dad.push(String(checkedKeys.node.previousId));
      }
      if (checkedKeys.node.id) {
        dad.push(String(checkedKeys.node.id));
      }
      if (checkedKeys.node.children) {
        pushnodeId(checkedKeys.node.children);
      }
    } else {
      treeSet();
      remove(String(checkedKeys.node.value));
      if (checkedKeys.node.children) {
        removenodeId(checkedKeys.node.children);
      }
    }
    // if (!checkedKeys.checked && checkedKeys.checkedNodes.length == 1) {
    //   remove(String(checkedKeys.checkedNodes[0].value));
    // }
  };
  // 提取数据所有id
  const handBox = (menudata: any[]) => {
    menudata.forEach(item => {
      checkbox.push(String(item.id));
      if (item.button) {
        checkbox.push(item.button);
      } else {
        handBox(item.submenu);
      }
    });
    // 识别是否勾选
    if (dad.sort().toString() === checkbox.sort().toString()) {
      setCheckboxboolean(true);
    }
  };
  // 提取数据所有id
  const handbutBox = (menudata: any[]) => {
    menudata.forEach(item => {
      butcheckbox.push(String(item.id));
    });
    // 识别是否勾选
    if (but.sort().toString() === butcheckbox.sort().toString()) {
      setCheckboxbutboolean(true);
    }
  };
  // 全选
  const menuCheckbox = e => {
    setCheckboxboolean(e.target.checked);
    if (e.target.checked) {
      dad.push(...checkbox);
      treeSet();
    } else {
      dad.splice(0);
    }
  };
  // 高级权限全选
  const buttonCheckbox = e => {
    setCheckboxbutboolean(e.target.checked);
    if (e.target.checked) {
      setBut(butcheckbox);
    } else {
      setBut([]);
    }
  };
  // 识别高级权限是否勾选
  const butendCheckbox = e => {
    if (
      Array.from(new Set(e))
        .sort()
        .toString() ===
      Array.from(new Set(butcheckbox))
        .sort()
        .toString()
    ) {
      setCheckboxbutboolean(true);
    } else {
      setCheckboxbutboolean(false);
    }
  };
  // 识别是否勾选
  const endCheckbox = e => {
    if (
      Array.from(new Set(dad))
        .sort()
        .toString() ===
      Array.from(new Set(checkbox))
        .sort()
        .toString()
    ) {
      setCheckboxboolean(true);
    } else {
      setCheckboxboolean(false);
    }
  };
  return (
    <ModalForm
      onVisibleChange={
        () => {
          // endCheckbox(detail);
          setBut(buttondetail);
          butendCheckbox(buttondetail);
          // setTree(detail);
          getList()
        }
      }
      key="add-form"
      title={
        <div>
          编辑权限
          <a style={{ fontSize: '14px' }}>
            当前拥有:{Array.from(new Set(dad)).length + Array.from(new Set(but)).length}个权限
          </a>
        </div>
      }
      width={530}
      trigger={<a>编辑权限</a>}
      form={form}
      onFinish={() => {
        setMenuTree({
          array: Array.from(new Set(dad)),
          roleId: id,
          button: Array.from(new Set(but)),
        }).then(res => {
          if (!res) {
            message.success('编辑成功！');
            getList();
          } else {
            message.error('编辑失败！');
          }
        });
        return true;
      }}
    >
      <ProForm.Group>
        <div style={{ width: '235px' }}>
          <Checkbox
            style={{ marginLeft: '10px', marginBottom: '7px' }}
            checked={checkboxboolean}
            onChange={e => menuCheckbox(e)}
          >
            全选
          </Checkbox>
          <Tree
            style={{ height: '490px', overflow: 'hidden', overflowY: 'scroll' }}
            checkedKeys={Array.from(new Set(dad))}
            checkable
            checkStrictly={true}
            onCheck={(e, checkedKeys) => {
              setTree(e.checked), handCheckedkeys(checkedKeys), endCheckbox(e.checked);
            }}
            multiple
          >
            {menuMap(menu)}
          </Tree>
        </div>
        <div>
          <Checkbox
            style={{ marginLeft: '10px', marginBottom: '7px' }}
            checked={checkboxbutboolean}
            onChange={e => buttonCheckbox(e)}
          >
            高级权限全选
          </Checkbox>
          <Tree
            checkedKeys={Array.from(new Set(but))}
            checkable
            checkStrictly={true}
            onCheck={e => {
              setBut(e.checked);
              butendCheckbox(e.checked);
            }}
            multiple
          >
            {tbutton.map(item => (
              <TreeNode key={item.id} value={item.id} title={item.name}></TreeNode>
            ))}
          </Tree>
        </div>
      </ProForm.Group>
    </ModalForm>
  );
};
export default EditPermission;
