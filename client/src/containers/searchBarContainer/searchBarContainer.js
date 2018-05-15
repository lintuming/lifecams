import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/searchBar';
import {
	inputSearch,
	confirmSearch,
	setInput,
	requestData,
	toggleResults
} from '../../actions'

export default connect(

	(state)=>({
		issearching:state.getIn(['search','issearching']),
		searchKey:state.getIn(['search','key']),
		searchtype:state.getIn(['input','searchtype']),
		searchvalue:state.getIn(['input','searchvalue']),
		resultsShow:state.getIn(['search','resultsShow'])
	}),
	(dispatch)=>({
		onTypeChange:(event,{value})=>{
			console.log(value)
			dispatch(setInput({key:'searchtype',value:value}))
		},
		onSearchChange:(event,{value})=>{
			
		    dispatch(toggleResults(true))
			dispatch(setInput({key:'searchvalue',value:value}))
			if(value===''){dispatch(toggleResults(false))
				return}
			dispatch(inputSearch(dispatch,value))
		},
		onConfirmSearch:(type)=>(e,{result})=>{

			dispatch(setInput({key:'searchvalue',value:result.title}))
			dispatch(confirmSearch(dispatch,type,result.title))
			dispatch(toggleResults(false))
		},
		onBlur:()=>{
			dispatch(requestData(false))
			setTimeout(()=>{dispatch(toggleResults(false))},200)
			
		},
		onPressEnter:(type,value)=>(e)=>{
			console.log(e.keyCode)
			 if(e.keyCode===13){
			 	dispatch(confirmSearch(dispatch,type,value))
			 	dispatch(toggleResults(false))
			 }
		}
		
	}),
	  (stateProps,dispatchProps,ownProps)=>{
	  	   const { searchtype,searchvalue} = stateProps;
	  	   const { onConfirmSearch ,onPressEnter} = dispatchProps;
	  	   
	  	   return Object.assign({},stateProps,dispatchProps,ownProps,{
	  	   	    onConfirmSearch:onConfirmSearch(searchtype),
	  	   	    onPressEnter:onPressEnter(searchtype,searchvalue)
	  	   })
	  }

)(SearchBar)