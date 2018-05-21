declare var toastr :any;
export class Notification {
	static show(type, message = "", options = {}) {
		toastr.options.timeOut = 7000;
		toastr.options.progressBar = true;
		toastr.options.closeButton = true;
		toastr.options.escapeHtml = true;
		toastr.options.closeHtml = "<button><i class='fa fa-times'></i></button>";
		switch(type) {
			case 'success':
			  toastr.success('Success!', message, options);
			  break;
			case 'info':
			  toastr.info('Information!', message, options);
			  break;
			case 'warning':
			  toastr.warning('Warning!', message, options);
			  break;
			case 'error':
			  let emsg = "Something wrong! Try after sometimes"
			  toastr.error('Sonmething Wrong!', (message == "" ? emsg : message), options);
			  break;
			default:
              toastr.info('Information!', message, options);
			  break;
		}
	}
}