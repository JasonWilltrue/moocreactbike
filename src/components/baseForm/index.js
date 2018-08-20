import React, { Component } from "react";
import { Select, Form,Input,Checkbox ,Button} from 'and';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class BaseForm extends Component {

  handleFilterSubmit= ()=>{
    let filterInfo = this.props.form.getFieldsValue();
    this.props.filterSubmit(filterInfo);
  }

	initFormList = () => {
		const { getFieldDecorator } = this.props.form;

		const formList = this.props.formList;

		const formItemList = [];
		if (formList && formList.length > 0) {
			formList.map((item, i) => {
				let label = item.label;
				let field = item.field;
				let initalValue = item.initalValue || '';
				let placeholder = item.placeholder;
				let width = item.widht;
				if (item.type === 'INPUT') {
					const INPUT = (
						<FormItem label={label} key={field}>
							{getFieldDecorator([field], {
								initalValue: initalValue,
							})(<Input type="text" placeholder={placeholder} />)}
						</FormItem>
					);
					formItemList.push(INPUT);
				} else if (item.type === 'SELECT') {
					const SELECT = (
						<FormItem label={label} key={field}>
							{getFieldDecorator([field], {
								initalValue: initalValue,
							})(
								<Select placeholder={placeholder} style={{ width: { width } }}>
									{Utils.getOptionList(item.list)}
								</Select>
							)}
						</FormItem>
					);
					formItemList.push(SELECT);
				} else if (item.type === 'CHECKBOX') {
					const CHECKBOX = (
						<FormItem label={label} key={field}>
							{getFieldDecorator([field], {
								valuePropName: 'checkbox',
								initalValue: initalValue, //true or false
							})(<Checkbox>{label}</Checkbox>)}
						</FormItem>
					);
					formItemList.push(CHECKBOX);
				}
			});
    }
    return formItemList;
	};

	render() {
		return (
			<div>
				<Form>
           {this.initFormList()}
           <FormItem>
          <Button
            icon="search"
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button icon="reload" type="default" onClick={this.reset}>
            重置
          </Button>
        </FormItem>
        </Form>
			</div>
		);
	}
}

export default Form.create({})(BaseForm);
