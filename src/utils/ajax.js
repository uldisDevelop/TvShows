let ajaxCounter = 0;
const ajaxQueue = {};

const ajaxDefaults = {
    id: null,
    method: 'GET',
    url: '',
    onSuccess() { },
    onError() { },
    always() { },
    allowMultipleRequests: true,
    key: ''
};

const getAjaxDefaults = function () {
    const ajaxData = { ...ajaxDefaults };
    ajaxData.id = ajaxCounter++;
    ajaxData.controller = new AbortController()
    return ajaxData;
};


export function abortAjaxByKey(key) {
    if (ajaxQueue[key]) {        
        ajaxQueue[key].controller.abort();
        delete ajaxQueue[key];
    }
}


function addToAjaxQueue(ajaxData) {
    ajaxQueue[ajaxData.key] = {
        controller: ajaxData.controller,
        url: ajaxData.url,
        id: ajaxData.id
    };
}

export async function ajax(data) {

    const ajaxData = { ...getAjaxDefaults(), ...data };    
    
    if (!ajaxData.allowMultipleRequests) {
        //abort previous requests with the same key (if there are any)
        abortAjaxByKey(ajaxData.key);

        //add ajax call to queue
        addToAjaxQueue(ajaxData);
    }

    try {
        const response = await fetch(ajaxData.url, {
            method: ajaxData.method,
            signal: ajaxData.controller.signal
        });
        const data = await response.json()
        
        if (response.ok) {
            ajaxData.onSuccess(data);            
        }
        else {
            ajaxData.onError(response);            
        }
    }
    catch (error) {
        if (error.name === 'AbortError') {
            return;
        }        
        ajaxData.onError(error);
    }


    if (!ajaxData.allowMultipleRequests) {
        delete ajaxQueue[ajaxData.key];
    }
}

