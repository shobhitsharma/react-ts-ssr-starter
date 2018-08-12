import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Chance } from 'chance';
import { State } from '../../reducers';
import { Props, App as AppComponent } from '../../components/App';
import { setUserName } from '../../actions/users';

const chance = new Chance();

const mapStateToProps = (state: State) => ({
  name: state.users.name
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserName: (name?: string) => {
    dispatch(setUserName(name || chance.name()));
  }
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)<Props & { store?: unknown }>(AppComponent);
