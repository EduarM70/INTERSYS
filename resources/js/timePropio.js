var timeFunctions = function() {
    var instance = this;
    var days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
    ];
    var meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];
    this.componerFecha = function(fechaElement, hideElement) {
        setInterval(function(){        
            var s = new Date;
            var data = {
                'WeekDay': instance.DayOfWeek(s),
                'Day': instance.Day(s),
                'Month': instance.Month(s),
                'Year': instance.Year(s),
                'Hour': instance.Hour(s),
                'Minute': instance.Minute(s),
                'Second': instance.Seconds(s)
            }
            $.each(data, function(k, v) { fechaElement.find('.fecha_' + k).text(v); });
            fechaElement.find('div').show();
            hideElement.hide();
        }, 1000);
        return 1;
    }
    this.DayOfWeek = function(date = null) {
        if(date == null) {
            vartime = days[(new Date).getDay()];
        }
        else {
            vartime = days[date.getDay()];
        }
        return vartime;
    }
    this.Day = function(date = null) {
        if(date == null) {
            vartime = (new Date).getDate();
        }
        else {
            vartime = date.getDate();
        }
        return vartime;
    }
    this.Month = function(date = null) {
        if(date == null) {
            vartime = meses[(new Date).getMonth()];
        }
        else {
            vartime = meses[date.getMonth()];
        }
        return vartime;
    }
    this.Year = function(date = null) {
        if(date == null) {
            vartime = (new Date).getFullYear();
        }
        else {
            vartime = date.getFullYear();
        }
        return vartime;
    }
    this.Hour = function(date = null) {
        if(date == null) {
            vartime = (new Date).getHours();
        }
        else {
            vartime = date.getHours();
        }
        return ("0" + vartime).slice(-2);
    }
    this.Minute = function(date = null) {
        if(date == null) {
            vartime = (new Date).getMinutes();
        }
        else {
            vartime = date.getMinutes();
        }
        return ("0" + vartime).slice(-2);
    }
    this.Seconds = function(date = null) {
        if(date == null) {
            vartime = (new Date).getSeconds();
        }
        else {
            vartime = date.getSeconds();
        }
        return ("0" + vartime).slice(-2);
    }
}