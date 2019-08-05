import React from "react";
import {Pagination, Table} from "react-bootstrap";
import FieldService from "../../../service/FieldService";
import Combobox from "../../basic_components/combobox/Combobox";
import ResponseService from "../../../service/ResponseService";
import ResponseWebsocketService from "../../../service/ResponseWebsocketService";

class ResponsesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            size: 5,
            fields: [],
            responses: [],
            allResponsesCount: 0,
            startFieldNumber: 0,
            finishFieldNumber: 0,
            pageCount: 1,
        };
        this.updateResponsesTable = this.updateResponsesTable.bind(this);
        this.setTableSize = this.setTableSize.bind(this);
        this.togglePage = this.togglePage.bind(this);
        this.setPrevPage = this.setPrevPage.bind(this);
        this.setNextPage = this.setNextPage.bind(this);
        ResponseWebsocketService.connect();
        ResponseWebsocketService.callback = this.callback.bind(this);
    }

    componentDidMount() {
        FieldService.getAllFields().then(
            (response) => {
                this.setState({
                    ...this.state,
                    fields: response.data
                });
                this.updateResponsesTable();
            }
        );
    }

    callback = function (message) {
        if (message) {
            this.updateResponsesTable();
        }
    };

    updateResponsesTable() {
        ResponseService.getAllForPagination(this.state.page, this.state.size).then(
            (response) => {
                this.setState({
                    responses: response.data.responses,
                    allResponsesCount: response.data.count,
                    startFieldNumber: response.data.start_number,
                    finishFieldNumber: response.data.finish_number,
                    pageCount: response.data.page_count
                }, () => {
                    this.render()
                });
            }
        )
    }

    setTableSize(event) {
        console.log(111)
        this.setState({
            size: event.target.value,
            page: 1
        }, () => {
            this.updateResponsesTable();
        });
    }

    togglePage(e) {
        if (e.target.text) {
            this.setState({
                page: Number(e.target.text)
            }, () => {
                this.updateResponsesTable();
            });
        }
    }

    setPrevPage() {
        this.setState((state) => ({
            page: state.page - 1
        }), () => {
            this.updateResponsesTable();
        });
    }

    setNextPage() {
        this.setState((state) => ({
            page: state.page + 1
        }), () => {
            this.updateResponsesTable();
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
                    <p className="table__element__label">Responses</p>
                </div>
                <div className="table__body">
                    <Table striped hover>
                        <thead>
                        <tr>
                            {
                                this.state.fields.map(field =>
                                    <th key={field.id}>
                                        {field.label}
                                    </th>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.responses.map(response =>
                                <tr key={response.id}>
                                    {
                                        this.state.fields.map(field =>
                                            <td key={response.id + '' + field.id}>
                                                {response.answer[field.id] ? response.answer[field.id] : 'N/A'}
                                            </td>
                                        )
                                    }
                                    <td>

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
                            {this.state.startFieldNumber}-{this.state.finishFieldNumber} of {this.state.allResponsesCount}
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
                        <Combobox onChange={this.setTableSize} defaultValue={this.state.size} name='size'
                                  options={[{text: '5'}, {text: '10'}, {text: '15'}]}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResponsesTable;