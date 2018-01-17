// add an event listener to the shorten button for when the user clicks it
(function () {
    $('#shortly-btn').on('click', function () {
        var url = $('#user-url').val();
        if (!url) {
            alert('Please make an entry for the url');
            return;
        };

        var regExHttp = /^http[s]?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;
        if (!regExHttp.test(url)) {
            alert('Please make a valid entry for the url');
            $('#user-url').val('');
            return;
        };
        // AJAX call to /shorten with the URL that the user entered in the input box
        var request = $.ajax({
            url: '/shorten',
            type: 'POST',
            dataType: 'JSON',
            data: {
                url: $('#user-url').val()
            }
        });

        request.done(function (data, statusText, xhr) {
            var message = `Original long url: ${url}`;
            var resultHTML = `<span>Shortly url: </span><a target="_blank" class="result" href='${data.shortUrl}'>
                ${data.shortUrl}</a>`;
            $('#output-url').html(resultHTML);
            $('#output-message').html(message);
            $('#user-url').val('');
        });

        request.fail(function (jqXHR, textStatus) {
            var resultHTML = 'Server error occurred.Please try again';
            $('#output-url').html(resultHTML);
            $('#user-url').val('');
        });
    })
})();