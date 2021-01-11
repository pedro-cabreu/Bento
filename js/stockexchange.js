const button = document.querySelector('#chartButton');
const apiKey = 'mykey';

button.addEventListener("click", () => {

    $('.modal').show()
    fetchStockInfo()
});

$('.modal').on('click', function (e) { 
    
    e.preventDefault()
    
    e.target !== this ?  false : $('.modal').hide() // Close modal if clicked outside the dialog
});


function fetchStockInfo(){

    let mglu = false, weg = false, lame = false, bbas = false, igta = false

    $.ajax({
        type: "GET",
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MGLU3.SA&apikey="+apiKey,
        dataType: "JSON",
        success: function (response) {
            let last_refreshed_day = response['Meta Data']['3. Last Refreshed']
            $('#MGLU-value').text("R$" + response['Time Series (Daily)'][last_refreshed_day]['4. close']);
            //9
            if(window.localStorage.getItem("mglu-value") != 'undefined') window.localStorage.setItem("mglu-value", response['Time Series (Daily)'][last_refreshed_day]['4. close'])

            if(window.localStorage.getItem("mglu-value") > response['Time Series (Daily)'][last_refreshed_day]['4. close']){

                $('#MGLU-div').prepend('<i class="fas fa-caret-down"></i>');
            }else{

                $('#MGLU-div').prepend('<i class="fas fa-caret-up"></i>');
            }
            mglu = true
            stopLoader(mglu, weg, lame, bbas, igta)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=WEGE3.SA&apikey="+apiKey,
        dataType: "JSON",
        success: function (response) {
            let last_refreshed_day = response['Meta Data']['3. Last Refreshed']
            $('#WEG-value').text("R$" + response['Time Series (Daily)'][last_refreshed_day]['4. close']);
            //2
            if(window.localStorage.getItem("weg-value") != 'undefined') window.localStorage.setItem("weg-value", response['Time Series (Daily)'][last_refreshed_day]['4. close'])

            if(window.localStorage.getItem("weg-value") > response['Time Series (Daily)'][last_refreshed_day]['4. close']){

                $('#WEG-div').prepend('<i class="fas fa-caret-down"></i>');
            }else{

                $('#WEG-div').prepend('<i class="fas fa-caret-up"></i>');
            }
            weg = true
            stopLoader(mglu, weg, lame, bbas, igta)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=LAME4.SA&apikey="+apiKey,
        dataType: "JSON",
        success: function (response) {
            let last_refreshed_day = response['Meta Data']['3. Last Refreshed']
            $('#LAME-value').text("R$" + response['Time Series (Daily)'][last_refreshed_day]['4. close']);
            //4
            if(window.localStorage.getItem("lame-value") != 'undefined') window.localStorage.setItem("lame-value", response['Time Series (Daily)'][last_refreshed_day]['4. close'])

            if(window.localStorage.getItem("lame-value") > response['Time Series (Daily)'][last_refreshed_day]['4. close']){

                $('#LAME-div').prepend('<i class="fas fa-caret-down"></i>');
            }else{

                $('#LAME-div').prepend('<i class="fas fa-caret-up"></i>');
            }
            lame = true
            stopLoader(mglu, weg, lame, bbas, igta)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=BBAS3.SA&apikey="+apiKey,
        dataType: "JSON",
        success: function (response) {
            let last_refreshed_day = response['Meta Data']['3. Last Refreshed']
            $('#BBAS-value').text("R$" + response['Time Series (Daily)'][last_refreshed_day]['4. close']);
            //2
            if(window.localStorage.getItem("bbas-value") != 'undefined') window.localStorage.setItem("bbas-value", response['Time Series (Daily)'][last_refreshed_day]['4. close'])

            if(window.localStorage.getItem("bbas-value") > response['Time Series (Daily)'][last_refreshed_day]['4. close']){

                $('#BBAS-div').prepend('<i class="fas fa-caret-down"></i>');
            }else{

                $('#BBAS-div').prepend('<i class="fas fa-caret-up"></i>');
            }
            bbas = true
            stopLoader(mglu, weg, lame, bbas, igta)
        }
    });

    $.ajax({
        type: "GET",
        url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IGTA3.SA&apikey="+apiKey,
        dataType: "JSON",
        success: function (response) {
            let last_refreshed_day = response['Meta Data']['3. Last Refreshed']
            $('#IGTA-value').text("R$" + response['Time Series (Daily)'][last_refreshed_day]['4. close']);
            
            if(window.localStorage.getItem("igta-value") != 'undefined') window.localStorage.setItem("igta-value", response['Time Series (Daily)'][last_refreshed_day]['4. close'])

            if(window.localStorage.getItem("igta-value") > response['Time Series (Daily)'][last_refreshed_day]['4. close']){

                $('#IGTA-div').prepend('<i id="IGTA-indicator" class="fas fa-caret-down"></i>');
            }else{

                $('#IGTA-div').prepend('<i id="IGTA-indicator" class="fas fa-caret-up"></i>');
            }

            igta = true
            //2
            stopLoader(mglu, weg, lame, bbas, igta)
        },
        error: () => {


        }
    });
}

function stopLoader(mglu, weg, lame, bbas, igta){

    if(mglu && weg && lame && bbas && igta){

        $('.modal-body').css('display', 'flex')
        $('.loader').hide()

        mgluValue = parseFloat($('#MGLU-value').text().split("$")[1]) * 9
        wegValue = parseFloat($('#WEG-value').text().split("$")[1]) * 2
        lameValue = parseFloat($('#LAME-value').text().split("$")[1]) * 4
        BbasValue = parseFloat($('#BBAS-value').text().split("$")[1]) * 2
        igtaValue = parseFloat($('#IGTA-value').text().split("$")[1]) * 2
        
        totalValue = mgluValue + wegValue + lameValue + BbasValue + igtaValue

        $('#total-value').text("Total: R$" + totalValue.toFixed(2))

    }else{

        return false
    }
}