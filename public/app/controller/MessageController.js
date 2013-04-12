Ext.define('ExtJsSample.controller.MessageController', {
    extend: 'Ext.app.Controller',
    stores: [
        'MessageStore'
    ],

    models: [
        'Message'
    ],

    views: [
        'message.List',
        'message.Edit'
    ],
    init: function () {
        this.control({
            'messageList > gridpanel': {
                itemdblclick: this.editMessage
            },
            'messageList > button[action=createNewRecord]': {
                click: this.createMessage
            },
            'messageList > button[action=search]': {
                click: this.onSearch
            },
            'messageEdit > button[action=save]': {
                click: this.doSaveMessage
            },
            'messageList > textfield': {
                search: this.onSearch
            }
        });
    },

    editMessage: function (grid, record) {
        var view = Ext.widget('messageEdit');
        view.down('form').loadRecord(record);
    },

    createMessage: function () {
        Ext.widget('messageEdit');
    },

    onSearch: function () {
        var store = Ext.getStore("MessageStore");
        var searchQuery = Ext.ComponentQuery.query('#messageListPanel [name=searchField]')[0].getValue();
        searchQuery = searchQuery.replace(/[\W]+/g, ',');
        store.load({
            params: {q: searchQuery}
        })
    },

    doSaveMessage: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
            store = Ext.getStore("MessageStore");
        if (values.Tags) {
            values.Tags = values.Tags.split(",");
        }
        if (form.getForm().isValid()) {
            if (record) {
                // as we edit the whole object, we just can exchange IDs and voila.
                values._id = record.data._id;
                record.set(values);
            } else {
                store.add(values);
            }
            win.close();
        }
    }
});