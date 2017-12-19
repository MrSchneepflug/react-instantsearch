import PropTypes from 'prop-types';
import React, { Component } from 'react';

import translatable from '../core/translatable';

class InfiniteResults extends Component {
  render() {
    const {
      cx,
      hitComponent: ItemComponent,
      hits,
      hasMore,
      refine,
      translate,
    } = this.props;

    return (
      <div>
        <ul className={cx('list')}>
          {hits.map(hit => (
            <li key={hit.objectID} className={cx('item')}>
              <ItemComponent hit={hit} />
            </li>
          ))}
        </ul>
        <button
          className={cx('loadMore', !hasMore && 'loadMore--disabled')}
          onClick={() => refine()}
          disabled={!hasMore}
        >
          {translate('loadMore')}
        </button>
      </div>
    );
  }
}

InfiniteResults.propTypes = {
  cx: PropTypes.func.isRequired,
  hits: PropTypes.array,
  hitComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

/* eslint-disable react/display-name */
InfiniteResults.defaultProps = {
  hitComponent: hit => (
    <div
      style={{
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
      }}
    >
      {JSON.stringify(hit).slice(0, 100)}...
    </div>
  ),
};
/* eslint-enable react/display-name */

export default translatable({
  loadMore: 'Load more',
})(InfiniteResults);