import React, { Component } from "react";
import { Select, Form, Input, Checkbox, Button, DatePicker } from 'antd';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class BaseForm extends Component {

	handleFilterSubmit = () => {
		let filterInfo = this.props.form.getFieldsValue();
		this.props.filterSubmit(filterInfo);
	}

	//重置
	reset = () => {
		this.props.form.resetFields();
	}

	initFormList = () => {
		const { getFieldDecorator } = this.props.form;

		const formList = this.props.formList;

		const formItemList = [];
		if (formList && formList.length > 0) {
			formList.map((item, i) => {
				let label        = item.label;
				let field        = item.field;
				let initialValue = item.initialValue || '';
				let placeholder  = item.placeholder;
				let width        = item.width;
				//封装各个类型模块
				if (item.type === "时间查询") {
					const start_time = (<FormItem label={label} key={field}>
						{getFieldDecorator("start_time")(
							<DatePicker showTime placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss" />
						)}
					</FormItem>);
					formItemList.push(start_time)
					const end_time = (<FormItem label="~" colon={false} key={field + 1}>
						{getFieldDecorator("end_time")(
							<DatePicker showTime placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
						)}
					</FormItem>)
					formItemList.push(end_time)
				}

				if (item.type === 'INPUT') {
					const INPUT = (
						<FormItem label={label} key={field}>
							{getFieldDecorator([field], {
								initialValue: initialValue,
							})(<Input type="text" placeholder={placeholder} style={{ width: width }} />)}
						</FormItem>
					);
					formItemList.push(INPUT);
				} else if (item.type === 'SELECT') {
					const SELECT = (
						<FormItem label={label} key={field}>
							{getFieldDecorator([field], {
								initialValue: initialValue,
							})(
								<Select placeholder={placeholder} style={{ width: width }}>
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
								initialValue : initialValue,   //true or false
							})(<Checkbox>{label}</Checkbox>)}
						</FormItem>
					);
					formItemList.push(CHECKBOX);
				} else if (item.type === 'DATEPICKER') {
					const in_time = (<FormItem label={label} key={field}>
						{getFieldDecorator([field])(
							<DatePicker showTime placeholder={placeholder} format="YYYY-MM-DD" style={{ width: width }} />
						)}
					</FormItem>)
					formItemList.push(in_time)
				}
			});
		}
		return formItemList;
	};

	render() {
		return (
			<div>
				<Form layout="inline">
					{this.initFormList()}
					<FormItem>
						<Button
							icon    = "search"
							type    = "primary"
							style   = {{ margin: "0 20px" }}
							onClick = {this.handleFilterSubmit}
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
