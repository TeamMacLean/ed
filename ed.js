function Ed() {

    var browsers = [];

    var submitButton = $.parseHTML('<input type="submit" value="Save Changes">');
    var $submitButton = $(submitButton);

    for (var key in window) {
        var value = window[key];
        if (value instanceof Browser) {
            browsers.push(value);
            setup(value);
        }
    }

    this.addSaveHandle = function (cb) {
        $submitButton.on('click', function () {
            var table = $submitButton.parent().parent().parent();
            var inputs = table.find('input[type="text"]');
            var data = [];
            inputs.each(function () {
                var $this = $(this);
                data.push({name: $this.data('name'), value: $this.val()});
            });
            cb(data);
        });
    };


    function setup(browser) {
        var sources = browser.sources;
        if (sources && sources.length > 0) {
            sources.forEach(function (source) {
                if (source.editable) {
                    makeEditable(browser);
                }
            });
        }
    }

    function tryAddEditOption(info, val, name) {
        console.log(val);
        if (val.toString()) {
            info.add(name, $.parseHTML('<input type="text" value="' + val + '" data-name="' + name + '">'));
        }
    }

    function makeEditable(browser) {
        browser.addFeatureInfoPlugin(function (f, info) {
            if (info.tier.dasSource.editable) {
                info.add('EDIT:', '');
                tryAddEditOption(info, f.orientation, 'Orientation');
                tryAddEditOption(info, f.score, 'Score');
                tryAddEditOption(info, f.min, 'Min');
                tryAddEditOption(info, f.max, 'Max');
                tryAddEditOption(info, f.type, 'Type');
                info.add('', submitButton);
            }
        });
    }


}



