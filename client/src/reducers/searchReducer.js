import {handleActions} from 'redux-actions';
import { SearchState } from '../constants/models';

const searchReducer =handleActions({
	REQUEST_DATA:(state,{payload})=>{
		return state.merge({issearching:payload})
	},
	INIT_RESULT:(state,{payload})=>{
		 console.log(payload)
		return state.update(payload.key,result=>payload.value).merge({isSearching:false})
	}
	,
	ADD_RESULT:(state,{payload})=>{

       return state.update(payload.key,result=>result.concat(payload.value)).merge({isSearching:false})
	},
	GET_KEY:(state,{payload})=>{
		
		return state.merge({"key":payload})
	},
	PRE_VALUE:(state,{payload})=>{
		return state.merge({'preValue':payload})
	}
	,
	SET_PAGE:(state,{payload})=>{
		
		return state.merge({page:payload})
	},
	TOGGLE_RESULTS:(state,{payload})=>(
		state.merge({resultsShow:payload})
	)

},SearchState)
export default searchReducer