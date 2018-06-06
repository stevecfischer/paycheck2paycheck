import React, { Component, Fragment } from 'react';
import Input from './Input';
import StyledComponentsButton from './StyledComponentsButton';

export default class Streams extends Component {
  buildStreamList = () => {
    return this.props.expenseItems.map(item => {
      return (
        <li key={item.key}>
          <Input
            name="label"
            value={item.label || ''}
            handleOnChange={e =>
              this.props.handleOnChange(this.props.stream, item.key, e)
            }
          />
          <Input
            name="amount"
            value={item.amount || ''}
            handleOnChange={e =>
              this.props.handleOnChange(this.props.stream, item.key, e)
            }
          />
          <Input
            name="monthDay"
            value={item.monthDay || ''}
            handleOnChange={e =>
              this.props.handleOnChange(this.props.stream, item.key, e)
            }
          />
          <span
            onClick={() =>
              this.props.handleRemoveItem(this.props.stream, item.key)
            }
          >
            [-]
          </span>
        </li>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <div className="stream">
          <h3>{this.props.header}</h3>
          <ul>{this.buildStreamList()}</ul>
          <StyledComponentsButton
            handleAddNewItem={this.props.handleAddNewItem}
            streamType={this.props.stream}
          >
            Add New {this.props.stream} item
          </StyledComponentsButton>
        </div>
      </Fragment>
    );
  }
}

Streams.displayName = 'Streams';
