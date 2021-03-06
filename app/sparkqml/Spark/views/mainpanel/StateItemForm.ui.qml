import QtQuick 2.4

Item {
    id: item1
    width: 400
    height: 32
    property alias mouseArea: mouseArea

    property alias text: textItem.text

    property bool selected: false

    MouseArea {
        id: mouseArea
        anchors.fill: parent
    }

    Text {
        id: textItem
        x: 16
        y: 0
        color: "#de000000"
        text: qsTr("State")
        verticalAlignment: Text.AlignVCenter
        anchors.leftMargin: 16
        horizontalAlignment: Text.AlignLeft
        anchors.fill: parent
        font.pixelSize: 14
    }

    Rectangle {
        id: mask
        anchors.fill: parent
        color: "white"
        visible: false
        opacity: 0.3
    }

    states: [
        State {
            name: "Selected"
            when: selected

            PropertyChanges {
                target: mask
                color: "#377fd6"
                visible: true
            }
        }
    ]
}
