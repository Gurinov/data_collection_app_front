import React from "react";
import {Pagination, Table} from "react-bootstrap";
import FieldService from "../../../service/FieldService";
import AddEditFieldModal from "../../modal_boxes/AddEditFieldModal";
import Combobox from "../../basic_components/combobox/Combobox";

class FieldsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 5,
            fields: [],
            allFieldCount: 0,
            startFieldNumber: 0,
            finishFieldNumber: 0,
            pageCount: 1,
        };
        this.updateFieldTable = this.updateFieldTable.bind(this);
        this.setTableSize = this.setTableSize.bind(this);
        this.togglePage = this.togglePage.bind(this);
        this.setPrevPage = this.setPrevPage.bind(this);
        this.setNextPage = this.setNextPage.bind(this);
    }

    componentDidMount() {
        this.updateFieldTable();
    }

    updateFieldTable() {
        FieldService.getAllFields(this.state.page, this.state.size).then(
            (response) => {
                this.setState({
                    fields: response.data.fields,
                    allFieldCount: response.data.fields_count,
                    startFieldNumber: response.data.start_field_number,
                    finishFieldNumber: response.data.finish_field_number,
                    pageCount: response.data.page_count
                });
            }
        )
    }

    deleteField(id) {
        FieldService.deleteField(id).then(
            (response) => {
                if ((this.state.allFieldCount - 1) % this.state.size === 0) {
                    this.setPrevPage();
                } else {
                    this.updateFieldTable();
                }
            }
        )
    }

    setTableSize(event) {
        this.setState({
            size: event.target.value,
            page: 1
        }, () => {
            this.updateFieldTable();
        });
    }

    togglePage(e) {
        if (e.target.text) {
            this.setState({
                page: Number(e.target.text)
            }, () => {
                this.updateFieldTable();
            });
        }
    }

    setPrevPage() {
        this.setState((state) => ({
            page: state.page - 1
        }), () => {
            this.updateFieldTable();
        });
    }

    setNextPage() {
        this.setState((state) => ({
            page: state.page + 1
        }), () => {
            this.updateFieldTable();
        });
    }

    render() {
        let paginationItems = [];
        for (let i = 1; i <= this.state.pageCount; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === this.state.page} onClick={this.togglePage}>
                    {i}
                </Pagination.Item>
            );
        }
        return (
            <div className="custom_table">
                <div className="table__element">
                    <p className="table__element__label">Fields</p>
                    <AddEditFieldModal modalTitle="Add Field" updateTable={this.updateFieldTable}/>
                </div>
                <div className="table__body">
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Label</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Is Active</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.fields.map(field =>
                                <tr key={field.id}>
                                    <td>{field.label}</td>
                                    <td>{field.type}</td>
                                    <td>{Boolean(field.required).toString()}</td>
                                    <td>{Boolean(field.active).toString()}</td>
                                    <td className="table__buttons">
                                        <AddEditFieldModal field={field} modalTitle="Edit Field"
                                                           updateTable={this.updateFieldTable}/>
                                        <i className="fa fa-trash-alt"
                                           onClick={(() => this.deleteField(field.id))}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
                <div className="table__element">
                    <div className="table__element__info">
                        <p>
                            {this.state.startFieldNumber}-{this.state.finishFieldNumber} of {this.state.allFieldCount}
                        </p>
                    </div>
                    <div className="table__element__pagination">
                        <Pagination>
                            <Pagination.Prev disabled={this.state.page === 1} onClick={this.setPrevPage}/>
                            {paginationItems}
                            <Pagination.Next disabled={this.state.page === this.state.pageCount}
                                             onClick={this.setNextPage}/>
                        </Pagination>
                    </div>
                    <div className="table__element__toggleItemsPerPage">
                        <Combobox handleChange={this.setTableSize} defaultValue={this.state.size} name='size'
                                  options={[{text: '5'}, {text: '10'}, {text: '15'}]}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FieldsTable;