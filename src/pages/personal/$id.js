import React, { useState, useEffect } from 'react'
import connect from './connect'

export default connect(function ({ match, getDetail, detail }){

  useEffect(() => {
    const { id } = match.params||{};
    id && getDetail({id});
  }, [match.params]);
	return `personal${match.params.id}`+JSON.stringify(detail)
})
