/*参数表
 *
 * name: 可自定义文件key
 * action: 必传，服务器地址
 * params: 选传，携带参数
 * fileList: 文件上传列表
 * multiple: 是否多选
 * limit: 数量限制
 * labelId: 必传，外设label标签的for属性值，触发选择文件操作
 * autoUpload: 是否自动上传。如果选择手动上传，则父组件调用时，需在本组件上挂载ref(="ref")属性，并在父组件中调用this.refs[ref].xhrSubmit()方法执行上传
 * fileType: 文件类型数组，默认为所有类型
 * sizeLimit: 文件大小限制
 * accept: 支持的文件格式数组 ，优先级高于except
 * except: 排除的文件格式数组,
 */

/* 方法表
 *
 * onChange(fileList)： 父组件改变文件列表的回调，参数为文件新列表
 * onBefore：上传之前的校验操作，如果传递且返回了false，上传将不被调用
 * onProgress(index, progress)： 父组件传递文件进度的回调，参数为文件索引和文件信息（包含进度百分比和文件status）
 * onSuccess(index, req)： 上传成功的回调，参数为文件索引和返回值
 * onFailed(index, error)： 上传失败的回调，参数为文件索引和错误原因
 * onExceeded(item)：文件大小超出限制的回调，参数为超出大小的文件对象
 * */

import { message } from 'antd'
import React, { Component } from 'react'


const handleCreateUuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
const defaultAction = `${process.env.apiUrl}/upload`

export default class UploaderWithProgress extends Component {
	state = {
		name: this.props.name || "",
		action: this.props.action||defaultAction,
		params: this.props.params||{},
		fileList: [],
		multiple: this.props.multiple,
		limit: this.props.limit,
		labelId: this.props.labelId || 'my-upload-progress',
		autoUpload: this.props.autoUpload,
		fileType: this.props.accept||[],
		sizeLimit: this.props.sizeLimit,
		withCredentials: true,
		except: this.props.except
	}
	addFile = ({target: {files}}) => {//input标签触发onchange事件时，将文件加入待上传列表
		let filesArr = [...files];
		const input = this.refs[this.state.labelId];
		if(input) input.value = null;

		filesArr = onExceededCheck(this.props.sizeLimit, filesArr, this.props.onExceeded);

		const fileType = this.state.fileType; const restArr = []; const except = this.state.except;
		if(fileType && Array.isArray(fileType) && fileType.length){
			filesArr = filesArr.filter(item => {
				const yes = fileType.some(i => {
					const reg = new RegExp(i); const suffix = item.name.split('.').reverse()[0];
					return reg.test(suffix);
				});
				if(!yes) restArr.push(item);
				return yes;
			});
		}else if(except && Array.isArray(except) && except.length){
			filesArr = filesArr.filter(item => {
				const yes = except.every(i => {
					const reg = new RegExp(i); const suffix = item.name.split('.').reverse()[0];
					const contain = reg.test(suffix);
					return !contain;
				});
				if(!yes) restArr.push(item);
				return yes;
			});
		}
		if(restArr.length){
			this.props.exceptList && this.props.exceptList(restArr);
			if(!filesArr.length || restArr.length === filesArr.length) return ;
		}
		for(let i = 0, l = filesArr.length; i < l; i++){
			//filesArr[i].url = URL.createObjectURL(filesArr[i]);//创建blob地址，如果是图片，可以预先展示
			filesArr[i].status = 'ready';
			filesArr[i].localId = handleCreateUuid();
		}
		let fileList = [...filesArr];
		if(this.state.multiple){//多选时，文件全部压如列表末尾
			const l = fileList.length;
			let limit = this.state.limit;
			if(limit && typeof limit === "number" && Math.ceil(limit) > 0 && l > limit){//有数目限制时，取后面limit个文件
				limit = Math.ceil(limit);
				fileList = fileList.slice(l - limit);
			}
		}else{//单选时，只取最后一个文件。注意这里没写成fileList = filesArr;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
			fileList = [filesArr[0]];
		}
		this.props.onChange && this.props.onChange(fileList);//调用父组件方法，将列表缓存到上一级data中的fileList属性
		setTimeout(() => {
			if('autoUpload' in this.props && this.props.autoUpload !== false)
				fileList.length && this.xhrSubmit(fileList);
		});
	}
	xhrSubmit = (fileList) => {
		if(!this.checkIfCanUpload()) return ;
    const _this = this;
		const options = fileList.map((currentFile, index) => ({
			file: currentFile,
			data: _this.props.params,
      filename: _this.state.name || "file",
      action: _this.state.action,
      withCredentials: _this.state.withCredentials,
      onProgress(e){
      	if(_this.props.onProgress)
        	_this.props.onProgress(index, {...e, localId: currentFile.localId, status: 'uploading'});
      },
      onSuccess(response){
      	if(_this.props.onSuccess){
					const uploadTime = +new Date();
        	_this.props.onSuccess(index, {response, currentFile, uploadTime, status: 'done', percent: 100});
        }
      },
      onError(err){
      	if(!window.navigator.onLine)
      		message.error('网络异常，请检查网络设置');
      	if(_this.props.onFailed)
       		_this.props.onFailed(index, {error: err, status: 'error'});
      }
	  }));
		const send = async options => {
			for await (const option of options){
				await upload(option);
			}
		};
		send(options);
	}
	checkIfCanUpload = () => {
		return this.props.onBefore && this.props.onBefore() || !this.props.onBefore;
	}
	render(){
		const { name, multiple=true, labelId }=this.state;
		return <input
			style={{display:"none"}}
			onChange={this.addFile}
			multiple={multiple}
			type="file"
			name={name}
			ref={labelId}
			id={labelId}
		/>
	}
}
export function onExceededCheck(sizeLimit, filesArr, onExceeded){
	sizeLimit = Number(sizeLimit);
	if(sizeLimit > 0){
		if(filesArr.some(({size}) => size > sizeLimit)){
			filesArr = filesArr.filter(item => {
				item.size > sizeLimit && onExceeded && onExceeded(item);
				return item.size <= sizeLimit;
			});
		}
	}
	return filesArr;
}


export function upload(option) {
	if (typeof XMLHttpRequest === 'undefined') {
		return;
	}

	const xhr = new XMLHttpRequest();
	const action = option.action;

	if (xhr.upload) {
		xhr.upload.onprogress = function progress(e) {
			if (e.total > 0) {
				e.percent = (e.loaded / e.total * 100).toFixed(2);
			}
			const p = {percent: e.percent, loaded: e.loaded};
			option.onProgress(p);
		};
	}

	const formData = new FormData();

	if (option.data) {
		Object.keys(option.data).map(function (key) {
			formData.append(key, option.data[key]);
		});
	}


	xhr.onerror = function error(e) {
		option.onError({error: e, localId: option.file.localId});
	};

	xhr.onload = function onload() {
		if (xhr.status < 200 || xhr.status >= 300) {
			return option.onError(getError(action, option, xhr));
		}

		option.onSuccess(getBody(xhr));
	};

	xhr.open('post', action, true);

	if (option.withCredentials && 'withCredentials' in xhr) {
		xhr.withCredentials = true;
	}

	const headers = option.headers || {};

	for (const item in headers) {
		if (headers.hasOwnProperty(item) && headers[item] !== null) {
			xhr.setRequestHeader(item, headers[item]);
		}
	}
	formData.append(option.filename, option.file);
	xhr.send(formData);

	function getError(action, option, xhr) {
		let msg = void 0;
		if (xhr.response) {
			msg = `${xhr.status  } ${  xhr.response.error || xhr.response}`;
		} else if (xhr.responseText) {
			msg = `${xhr.status  } ${  xhr.responseText}`;
		} else {
			msg = `fail to post ${  action  } ${  xhr.status}`;
		}

		const err = {msg};
		err.status = xhr.status;
		err.method = 'post';
		err.url = action;
		err.localId = option.file.localId;
		return err;
	}

	function getBody(xhr) {
		const text = xhr.responseText || xhr.response;
		if (!text) {
			return text;
		}

		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	}
	return xhr;
}
