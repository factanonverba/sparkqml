.pragma library
.import "qrc:/QuickPromise/promise.js" as Q
.import QUIKit 1.0 as QUIKit
.import Spark.sys 1.0 as SparkSys

var Shell = QUIKit.Shell;
var Url = SparkSys.Url;
var FileInfo = SparkSys.FileInfo;

/// Given a qml file. Convert to an image file name.
function convertToImageName(fileName, selectedState) {
    var base = FileInfo.completeBaseName(fileName);
    if (selectedState === "") {
        return base + ".png";
    } else {
        return base + "(" + selectedState + ").png";
    }
}

function askToSaveFile(dialog, settings, store) {
    var promise = Q.promise();
    promise.resolve(dialog.onAccepted);
    promise.reject(dialog.onRejected);
    promise.then(function() {
        var path = Url.path(dialog.fileUrl.toString());
        store.dispatch({
            type: "copyToFile",
            arguments: [path]
        });
    });
    var folder = settings.saveFolder;
    var state = store.getState();

    if (folder === "") {
        folder = Shell.dirname(Url.path(state.source));
    }
    folder = "file:" + folder + "/" + convertToImageName(state.fileName, state.selectedState);

    dialog.selectMultiple = false;
    dialog.selectExisting = false;
    dialog.nameFilters = [ "Image files (*.png)"];
    dialog.folder = folder;
    dialog.open();
}

function create(dialog, settings) {

    return function (store) {

        return function(next) {

            return function (action) {
                if (action.type !== "askToSaveFile") {
                    next(action);
                    return
                }
                askToSaveFile(dialog, settings, store);
            }
        }
    }
}
