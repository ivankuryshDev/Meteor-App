import { FilesCollection } from "meteor/ostrio:files";

const UserFiles = new FilesCollection({
	storagePath: "assets/app/uploads/UserFiles",
	downloadRoute: "/files/UserFiles",
	collectionName: "UserFiles",
	permissions: 0o755,
	allowClientCode: false,
	cacheControl: "public, max-age=31536000",
	onbeforeunloadMessage() {
		return "Upload is still in progress! Upload will be aborted if you leave this page!";
	},
	onBeforeUpload(file) {

		if (file.size <= 10485760 && /pdf|docx|txt/i.test(file.extension)) {
			return true;
		}
		return "Please upload file, with size equal or less than 10MB";
	},
	downloadCallback(fileObj) {
		if (this.params.query.download == "true") {
			UserFiles.update(fileObj._id, {$inc: {"meta.downloads": 1}});
		}
		return true;
	}
});

export default UserFiles;