import {QueryBuilder} from 'react-querybuilder';
import React, {Component} from 'react';
import { Button, Glyphicon, Well, Modal, Tabs, Tab, Grid, Row, Col, Alert, FormGroup, Checkbox, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import CreateDataViewDialog from '../Dialogs/createDataView';
import CreateAlertViewDialog from '../Dialogs/createAlertView';
const {Footer, Body, Header, Title} = Modal;
/* eslint-disable react/prop-types*/

const fields = [
    { name: 'location', label: 'Location', value: {} },
    { name: 'time', label: 'Time' },
    { name: 'keyword', label: 'Keyword' },
    { name: 'user', label: 'User' },
    { name: 'source', label: 'Source' },
    { name: 'hasMedia', label: 'Has Attachment', value: false }
];

const CSSClass = {

    combinators: 'form-control', // <select> control for combinators
    addRule: 'btn btn-primary', // <button> to add a Rule
    addGroup: 'btn btn-primary', // <button> to add a RuleGroup
    removeGroup: 'btn btn-danger', // <button> to remove a RuleGroup

    rule: String, // <div> containing the Rule
    fields: 'form-control', // <select> control for fields
    operators: 'form-control', // <select> control for operators
    value: 'form-control', // <input> for the field value
    removeRule: 'btn btn-danger' // <button> to remove a Rule
};

function getEditor({field, operator, value, onChange}) {
    if (field == 'hasMedia') {
        // return empty control - we don't need another
        return (
            <span>
            </span>
        );
    }
    if (field == 'source') {
        return (
            <select className='form-control'>
                <option value="any">Any</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
            </select>
        )
    }
    if (field == 'time' && operator == 'last') {
        return (
            <select className='form-control'>
                <option value="last-15m">15 mins</option>
                <option value="last-h">1 hour</option>
                <option value="last-12h">12 hours</option>
                <option value="last-day">Day</option>
                <option value="last-week">Week</option>
            </select>
        )
    }
    if (field == 'keyword' && operator == 'equals') {
        return (
            <select className='form-control'>
                <option value="k-a">keyword-a</option>
                <option value="k-b">keyword-b</option>
                <option value="k-c">keyword-c</option>
                <option value="k-d">keyword-d</option>
                <option value="k-e">keyword-e</option>
            </select>
        )
    }
    if (field == 'keyword' && operator == 'savedList') {
        return (
            <select className='form-control'>
                <option value="s-a">Stores</option>
                <option value="s-b">Parties</option>
                <option value="s-c">Holidays</option>
                <option value="s-d">Sports</option>
                <option value="s-e">Schools</option>
            </select>
        )
    }
    if (field == 'location') {
        if (operator == 'na')
            return (
                <span/>
            );
        else return (
            <select className='form-control'>
                <option value="global">Global</option>
                <option value="map1">Current Viewport (Map1) </option>
                <optgroup label="System">
                    <option value="l-a">London Airports</option>
                    <option value="l-b">London Boroughs</option>
                </optgroup>
                <optgroup label="Locals">
                    <option value="m25">M25</option>
                    <option value="in-cafe">Internet Cafes</option>
                </optgroup>
            </select>
        )
    }
    return (<span>
        <input type="text" className="form-control" style={{ width: '30%', minWidth: '120px', display: 'inline-block' }}/>
    </span>)
}

function getOperators(field) {
    if (field == 'location') {
        return [{ name: 'within', label: 'within' }, { name: 'na', label: 'n/a' }];
    } else if (field == 'hasMedia') {
        return [{ name: 'true', label: 'Yes' }, { name: 'false', label: 'no' }];
    } else if (field == 'keyword') {
        return [{ name: 'true', label: 'Contains' }, { name: 'false', label: 'Doesn\'t contain' },
            { name: 'equals', label: 'Equals' },{ name: 'savedList', label: 'Saved list' } ];
    } else if (field == 'time') {
        return [{ name: 'before', label: 'Before' }, { name: 'after', label: 'After' },
            { name: 'between', label: 'Between' }, { name: 'last', label: 'Last' }];
    } else return null;

}

const startQuery = {
    combinator: 'and',
    id: '111',
    rules: [
        {
            id: '222',
            field: 'firstName',
            value: 'Test',
            operator: '='
        }
    ]
};




export default class QueryBuilderWindow extends Component {

    constructor(prop) {
        super(prop);
        this.state = { showModalView: false, showModalAlert: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
         this.openAlert = this.openAlert.bind(this);
    }

    close() {
        this.setState({ showModalView: false });
        this.setState({ showModalAlert: false })
    }

    open() {
        this.setState({ showModalView: true });
    }
    openAlert() {
        this.setState({ showModalAlert: true });
    }
    render() {
        const {showModalView, showModalAlert} = this.state;
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div className="container-fluid" >
                    <div className="row" >
                        <div className="col-md-2" style={{ minWidth: '110px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://github.com/DeepBlueCLtd/lesco/raw/master/logo.png" style={{ height: '100px', marginTop: '30px', marginLeft: '10px' }}/>
                            </div>
                        </div>
                        <div className="col-xs-10" >
                            <Well  >
                                <strong>Create your search query</strong>
                                <QueryBuilder query={startQuery} fields={fields}
                                    onQueryChange={logQuery} getEditor={getEditor} getOperators={getOperators} controlClassnames= {CSSClass}/>
                            </Well>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Button bsStyle='danger' onClick={this.openAlert}  ><Glyphicon glyph="alert" />  Create Alert </Button>
                    <Button bsStyle='primary' onClick={this.open} ><Glyphicon glyph="eye-open" /> Show in Data View  </Button>
                    <div style={{ clear: 'both' }}></div>
                </div>


                <Modal show={showModalView} onHide={this.close}>
                    <Header closeButton>
                        <Title>Create Data View</Title>
                    </Header>
                    <Body>
                        <CreateDataViewDialog/>
                    </Body>
                    <Footer>
                        <Button  bsStyle="success"onClick={this.close}>Confirm</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Footer>
                </Modal>
                <Modal show={showModalAlert} onHide={this.close}>
                    <Header closeButton>
                        <Title>Create Alert</Title>
                    </Header>
                    <Body>
                        <CreateAlertViewDialog/>
                    </Body>
                    <Footer>
                        <Button  bsStyle="success"onClick={this.close}>Confirm</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Footer>
                </Modal>


            </div >)
    }
}



function logQuery(query) {
    //console.log(query);
}