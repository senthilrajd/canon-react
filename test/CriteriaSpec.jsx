import Criteria from '../transpiled/Criteria';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

describe('Criteria', () => {
  let criteria;

  const onSelectionChanged = jasmine.createSpy('onSelectionChanged');

  const renderCriteria = (isSelected, disabled, hidden) => {
    return ReactTestUtils.renderIntoDocument(
      <Criteria
       label={'Next Gen'}
       count={5}
       id={'ng'}
       iconClass={'rs-active'}
       isSelected={isSelected}
       disabled={disabled}
       hidden={hidden}
       onSelectionChanged={onSelectionChanged} />
    );
  };

  beforeEach(() => {
    onSelectionChanged.calls.reset();
    criteria = renderCriteria(false, false, false);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(criteria).parentNode);
  });

  it('has the right class', () => {
    let listItem;

    listItem = ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li');
    expect(listItem).toHaveClass('rs-facet-item');
  });

  it('has the right title', () => {
    let listItem;

    listItem = ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li');
    expect(listItem.title).toBe('Next Gen');
  });

  it('shows an element with the icon class', () => {
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(criteria, 'rs-active')).not.toBeNull();
  });

  it('has the right label', () => {
    let label;

    label = ReactTestUtils.findRenderedDOMComponentWithClass(criteria, 'rs-facet-label');
    expect(label.textContent).toBe('Next Gen');
  });

  it('has the right count', () => {
    let listItem;

    listItem = ReactTestUtils.findRenderedDOMComponentWithClass(criteria, 'rs-facet-count');
    expect(listItem.textContent).toBe('(5)');
  });

  it('handles changing selection', () => {
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li'));
    expect(onSelectionChanged).toHaveBeenCalledWith(true, 'ng');
  });

  describe('selected', () => {
    beforeEach(() => {
      criteria = renderCriteria(true, false, false);
    });

    it('handles changing selection', () => {
      ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li'));
      expect(onSelectionChanged).toHaveBeenCalledWith(false, 'ng');
    });

    it('has the correct class', () => {
      let listItem;

      listItem = ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li');
      expect(listItem).toHaveClass('selected');
    });
  });

  describe('disabled', () => {
    beforeEach(() => {
      criteria = renderCriteria(false, true, false);
    });

    it('has the correct class', () => {
      let listItem;

      listItem = ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li');
      expect(listItem).toHaveClass('disabled');
    });

    it('does not change selection', () => {
      ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li'));
      expect(onSelectionChanged).not.toHaveBeenCalled();
    });
  });

  describe('hidden', () => {
    beforeEach(() => {
      criteria = renderCriteria(false, false, true);
    });

    it('has the correct class', () => {
      let listItem;

      listItem = ReactTestUtils.findRenderedDOMComponentWithTag(criteria, 'li');
      expect(listItem).toHaveClass('rs-hidden');
    });
  });
});
