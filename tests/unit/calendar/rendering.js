import '@progress/kendo-ui/src/kendo.calendar.js';
import { tzTest } from '../../helpers/unit/timezone.js';
import '@progress/kendo-ui/src/cultures/kendo.culture.bg-BG.js';

let calendar = kendo.calendar,
    template,
    div;

describe("kendo.ui.Calendar rendering", function() {
    beforeEach(function() {
        let cal = new kendo.ui.Calendar($("<div/>"));
        template = cal.month;
        cal.destroy();

        kendo.ns = "kendo-";
        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        kendo.ns = "";
    });

    it("firstDayOfMonth returns correct date", function() {
        let date = new Date(2011, 7, 31);
        let correct = new Date(2011, 7, 1);

        assert.deepEqual(calendar.firstDayOfMonth(date), correct);
    });

    it("firstVisibleDay returns correct date", function() {
        let date = new Date(2011, 7, 31, 10, 10, 5555);
        let correct = new Date(2011, 6, 31, 10, 10, 5555);

        assert.deepEqual(calendar.firstVisibleDay(date), correct);
    });

    it("month.setDate modify day", function() {
        let date = new Date(2011, 7, 31, 10, 10, 555),
            modified = new Date(date);

        date.setDate(21);

        calendar.views[0].setDate(modified, -10);

        assert.deepEqual(modified, date);
    });

    it("month.setDate updates even the second param is date", function() {
        let value = new Date(2011, 7, 31, 10, 10, 33, 111),
            origin = new Date(2010, 7, 22, 20, 11, 44, 666);

        calendar.views[0].setDate(origin, value);

        assert.equal(origin.getFullYear(), value.getFullYear());
        assert.equal(origin.getMonth(), value.getMonth());
        assert.equal(origin.getDate(), value.getDate());
        assert.equal(origin.getHours(), 20);
        assert.equal(origin.getMinutes(), 11);
        assert.equal(origin.getSeconds(), 44);
        assert.equal(origin.getMilliseconds(), 666);

    });

    it("year.setDate modify month", function() {
        let date = new Date(2011, 7, 31, 10, 10, 5555),
            modified = new Date(date);

        date.setMonth(11);

        calendar.views[1].setDate(modified, 4);

        assert.deepEqual(modified, date);
    });

    it("year.setDate should honer end day of month", function() {
        let date = new Date(2011, 3, 30, 10, 10, 5555),
            modified = new Date(2011, 7, 31, 10, 10, 5555);

        calendar.views[1].setDate(modified, -4);

        assert.deepEqual(modified, date);
    });

    it("year.setDate should work correctly when date is Jan and value is -1 ", function() {
        let date = new Date(2011, 11, 5),
            modified = new Date(2012, 0, 5);

        calendar.views[1].setDate(modified, -1);

        assert.deepEqual(modified, date);
    });

    it("year.setDate updates even the second param is date", function() {
        let value = new Date(2011, 7, 31, 10, 10, 33, 111),
            origin = new Date(2010, 7, 22, 20, 11, 44, 666);

        calendar.views[1].setDate(origin, value);

        assert.equal(origin.getFullYear(), value.getFullYear());
        assert.equal(origin.getMonth(), value.getMonth());
        assert.equal(origin.getDate(), 22);
        assert.equal(origin.getHours(), 20);
        assert.equal(origin.getMinutes(), 11);
        assert.equal(origin.getSeconds(), 44);
        assert.equal(origin.getMilliseconds(), 666);
    });

    it("decade.setDate modify year", function() {
        let date = new Date(2011, 7, 31, 10, 10, 5555),
            modified = new Date(date);

        date.setFullYear(2005);

        calendar.views[2].setDate(modified, -6);

        assert.deepEqual(modified, date);
    });

    it("decade.setDate updates even the second param is date", function() {
        let value = new Date(2011, 7, 31, 10, 10, 33, 111),
            origin = new Date(2010, 7, 22, 20, 11, 44, 666);

        calendar.views[2].setDate(origin, value);

        assert.equal(origin.getFullYear(), value.getFullYear());
        assert.equal(origin.getMonth(), 7);
        assert.equal(origin.getDate(), 22);
        assert.equal(origin.getHours(), 20);
        assert.equal(origin.getMinutes(), 11);
        assert.equal(origin.getSeconds(), 44);
        assert.equal(origin.getMilliseconds(), 666);
    });

    it("century.setDate modify decade", function() {
        let date = new Date(2011, 7, 31, 10, 10, 5555),
            modified = new Date(date);

        date.setFullYear(2001);

        calendar.views[3].setDate(modified, -1);

        assert.deepEqual(modified, date);
    });

    it("decade.setDate updates even the second param is date", function() {
        let value = new Date(2000, 7, 31, 10, 10, 33, 111),
            origin = new Date(2010, 7, 22, 20, 11, 44, 666);

        calendar.views[3].setDate(origin, value);

        assert.equal(origin.getFullYear(), value.getFullYear());
        assert.equal(origin.getMonth(), 7);
        assert.equal(origin.getDate(), 22);
        assert.equal(origin.getHours(), 20);
        assert.equal(origin.getMinutes(), 11);
        assert.equal(origin.getSeconds(), 44);
        assert.equal(origin.getMilliseconds(), 666);
    });

    it("Month view return title", function() {
        let date = new Date(),
            text = kendo.culture().calendar.months.names[date.getMonth()] + " " + date.getFullYear();

        assert.equal(calendar.views[0].title(date), text);
    });

    it("Month view title honors options.culture", function() {
        let date = new Date(),
            text = kendo.getCulture("bg-BG").calendars.standard.months.names[date.getMonth()] + " " + date.getFullYear();

        assert.equal(calendar.views[0].title(date, null, null, "bg-BG"), text);
    });

    it("month view renders days", function() {
        let currDate = new Date(2010, 10, 10),
            days = kendo.culture().calendar.days;

        div.html(calendar.views[0].content({
            date: currDate,
            empty: template.empty,
            showOtherMonthDays: true,
            content: template.content,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop
        }));

        assert.equal(div.find("thead").find("th").length, 7);
        assert.equal(div.find("thead").find("th").eq(0).html(), days.namesShort[0]);
        assert.equal(div.find("thead").find("th").eq(0).attr("aria-label"), days.names[0]);

        assert.equal(div.find("tbody").find("tr").length, 6);
        assert.equal(div.find("tbody").find("td").length, 42);
        assert.equal(div.find("tbody").find("span").length, 42);
    });

    it("header is correctly rendered for month view", function() {
        let day = new Date(2018, 1, 1);

        div.html(calendar.views[0].content({
            date: day,
            empty: template.empty,
            content: template.content,
            showOtherMonthDays: true,
            showHeader: true,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop
        }));

        assert.equal(div.find("caption").text(), "February 2018");
        assert.isOk(div.find("caption").hasClass("k-month-header"));
    });

    it("header is correctly rendered for year view", function() {
        let day = new Date(2018, 1, 1);

        div.html(calendar.views[1].content({
            date: day,
            empty: template.empty,
            content: template.content,
            showOtherMonthDays: true,
            showHeader: true,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop
        }));

        assert.isOk(div.find("caption").hasClass("k-meta-header"));
        assert.equal(div.find("caption").text(), "2018");
    });

    it("header is correctly rendered for decade view", function() {
        let day = new Date(2018, 1, 1);

        div.html(calendar.views[2].content({
            date: day,
            empty: template.empty,
            content: template.content,
            showOtherMonthDays: true,
            showHeader: true,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop
        }));

        assert.equal(div.find("caption").text(), "2010-2019");
        assert.isOk(div.find("caption").hasClass("k-meta-header"));
    });

    it("header is correctly rendered for century view", function() {
        let day = new Date(2018, 1, 1);

        div.html(calendar.views[3].content({
            date: day,
            empty: template.empty,
            content: template.content,
            showOtherMonthDays: true,
            showHeader: true,
            min: new Date(2000, 10, 10),
            max: new Date(2099, 10, 10),
            disableDates: $.noop
        }));

        assert.equal(div.find("caption").text(), "2000-2099");
        assert.isOk(div.find("caption").hasClass("k-meta-header"));
    });

    it("month view renders week number column when enabled", function() {
        let today = new Date(),
            days = kendo.culture().calendar.days,
            cells;

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            isWeekColumnVisible: true,
            content: template.content,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop,
            messages: { weekColumnHeader: "" }
        }));

        cells = div.find("tbody").find("td");

        assert.equal(div.find("thead").find("th").length, 8);

        assert.equal(div.find("tbody").find("tr").length, 6);
        assert.equal(div.find("tbody").find("td").length, 48);
    });

    it("month view renderer does not duplicate week numbers", function() {
        let today = new Date('2021-01-01T19:20:30Z');

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            isWeekColumnVisible: true,
            content: template.content,
            min: new Date(2000, 10, 10),
            max: new Date(2023, 10, 10),
            disableDates: $.noop,
            messages: { weekColumnHeader: "" }
        }));

        assert.equal(div.find("tr").eq(1).find("td").eq(0).text(), "53");
    });

    it("month view's content method honors culture", function() {
        let today = new Date(),
            days = kendo.getCulture("bg-BG").calendars.standard.days;

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            content: template.content,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop,
            culture: "bg-BG"
        }));

        assert.equal(div.find("thead").find("th").eq(0).html(), days.namesShort[1]);
        assert.equal(div.find("thead").find("th").eq(0).attr("aria-label"), days.names[1]);
    });

    it("month view renderer honors firstDayOfWeek property", function() {
        let today = new Date(2011, 9, 10);

        kendo.culture().calendar.firstDay = 1;

        div.html(calendar.views[0].content({
            date: today,
            disableDates: $.noop,
            showOtherMonthDays: true,
            empty: template.empty,
            content: template.content,
            min: today,
            max: today
        }));

        assert.equal(div.find("thead").find("th").eq(0).html(), kendo.culture().calendar.days.namesShort[1]);
        assert.equal(div.find("thead").find("th").eq(0).attr("aria-label"), kendo.culture().calendar.days.names[1]);

        kendo.culture().calendar.firstDay = 0;
    });

    it("month view honors firstVisibleDay", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            content: template.content,
            disableDates: $.noop,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10)
        }));

        assert.equal(div.find("tbody").find("span").html(), "25");
    });

    it("month view renders anchor in td with title", function() {
        let today = new Date(2011, 9, 10),
            firstVisibleDay = calendar.firstVisibleDay(today);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            content: template.content,
            disableDates: $.noop,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10)
        }));

        assert.equal(div.find("tbody").find("span").attr("title"), kendo.toString(firstVisibleDay, "D"));
        assert.equal(div.find("tbody").find("span").attr("class").trim(), "k-link");
    });

    it("month view renders anchor in td with title depending on the options.culture", function() {
        let today = new Date(2011, 9, 10),
            firstVisibleDay = calendar.firstVisibleDay(today, kendo.getCulture("bg-BG").calendars.standard);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            content: template.content,
            culture: "bg-BG",
            disableDates: $.noop,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10)
        }));

        assert.equal(div.find("tbody").find("span").attr("title"), kendo.toString(firstVisibleDay, "D", "bg-BG"));
    });

    tzTest("Sofia", "month view renders empty string if date is not in range", function() {
        let today = new Date(2011, 9, 10),
            max = new Date(2011, 9, 19);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            min: new Date(today),
            max: max,
            disableDates: $.noop,
            content: template.content
        }));

        assert.equal(div.find("tbody").find("td").html(), "&nbsp;");
        assert.equal(div.find("tbody").find("span:first").html(), today.getDate() + "");
        assert.equal(div.find("tbody").find("span:last").html(), max.getDate() + "");
    });

    tzTest("Brazil", "last day of March is rendered as part of the current month", function() {
        let today = new Date(2015, 2, 31),
            max = new Date(2015, 3, 1);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            min: new Date(today),
            max: max,
            disableDates: $.noop,
            content: template.content
        }));
        assert.equal($("[data-value='2015/2/31']").parent().hasClass("k-other-month"), false);
    });

    it("month view should render data-val attribute", function() {
        let max = new Date(2011, 9, 19),
            today = new Date(2011, 9, 10),
            value = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate();

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            min: new Date(today),
            max: max,
            disableDates: $.noop,
            content: template.content
        }));

        assert.equal(div.find("tbody").find("span:first").attr(kendo.attr("value")), value);
    });

    it("month view should render k-other-month style", function() {
        let today = new Date(2011, 9, 10),
            firstDay = kendo.calendar.firstVisibleDay(today);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        assert.equal(div.find("tbody tr:first").find("td.k-other-month").length, 6);
        assert.equal(div.find("tbody tr:last").find("td.k-other-month").length, 5);
    });

    it("month view should not render weekNumber if showOtherMonthDays is false and the week is empty", function() {
        let today = new Date(2020, 6, 10);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            messages: { weekColumnHeader: "" },
            showOtherMonthDays: false,
            isWeekColumnVisible: true,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        assert.equal(div.find("tbody tr:last").find("td.k-empty")[0].innerHTML, "&nbsp;");
    });

    it("month view should not render k-other-month to last day of month", function() {
        let today = new Date(2011, 8, 12, 10, 10, 10);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        let row = div.find("tbody tr:last").prev(),
            td = row.find("td.k-other-month:first");

        assert.equal(td.text(), "1");
        assert.isOk(!td.prev().hasClass("k-other-month"));
    });

    it("month view do not apply k-other-month to the first day of the month", function() {
        let today = new Date(2011, 8, 20, 14, 40, 0);

        div.html(calendar.views[0].content({
            date: today,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            showOtherMonthDays: true,
            empty: template.empty,
            disableDates: $.noop,
            content: template.content
        }));

        let cell = div.find("tbody").find("tr:first").find(".k-other-month:last").next();

        assert.equal(cell.children().attr(kendo.attr('value')), "2011/8/1");
    });

    it("month view renders k-today if today is in the current view", function() {
        let today = new Date();

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        let cell = div.find("tbody").find("td.k-today");

        assert.equal(cell.length, 1);
        assert.equal(cell.children().text(), today.getDate());
    });

    it("month view renders k-weekend", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            showOtherMonthDays: true,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        let cell = div.find("tbody").find("td.k-weekend");

        assert.equal(cell.length, 12);
    });

    it("month view passes dates array", function() {
        let today = new Date(2011, 9, 10),
            dates = [today];

        div.html(calendar.views[0].content({
            date: today,
            dates: dates,
            empty: template.empty,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: function(data) {
                assert.equal(data.dates, dates);
            }
        }));
    });

    it("month view renders URL if current date is in dates", function() {
        let today = new Date(2011, 9, 10),
            dates = [today];

        div.html(calendar.views[0].content({
            url: "/home/index?url={0}",
            date: today,
            dates: dates,
            format: "MM/dd/yyyy",
            empty: template.empty,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            disableDates: $.noop,
            content: template.content
        }));

        let a = div.find("span[data-href*=home]");

        assert.isOk(a[0]);
        assert.equal(a.attr("data-href"), "/home/index?url=10/10/2011");
    });

    it("month view honors culture when renders URL", function() {
        let today = new Date(2011, 9, 10),
            culture = kendo.getCulture("bg-BG"),
            format = culture.calendars.standard.patterns["D"],
            dates = [today];

        div.html(calendar.views[0].content({
            url: "/home/index?url={0}",
            date: today,
            dates: dates,
            culture: "bg-BG",
            format: format,
            empty: template.empty,
            min: new Date(1900, 0, 1),
            max: new Date(2900, 0, 1),
            content: template.content,
            disableDates: $.noop
        }));

        let a = div.find("span[data-href*=home]");

        assert.isOk(a[0]);
        assert.equal(a.attr("data-href"), "/home/index?url=" + kendo.toString(today, format, culture));
    });

    it("year view renders title", function() {
        let today = new Date(2011, 9, 10);

        assert.equal(calendar.views[1].title(today) + "", today.getFullYear() + "");
    });

    it("year view renders meta view  4x3 cells", function() {
        let today = new Date(2011, 9, 10),
            firstMonth = kendo.culture().calendar.months.namesAbbr[0],
            lastMonth = kendo.culture().calendar.months.namesAbbr[11];

        div.html(calendar.views[1].content({
            date: today,
            showOtherMonthDays: true,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10)
        }));

        assert.equal(div.find("tbody").find("tr:first").find("td").length, 4);
        assert.equal(div.find("tbody").find("td > span").length, 12);
        assert.equal(div.find("tbody").find("span:first").eq(0).html(), firstMonth);
        assert.equal(div.find("tbody").find("span:last").eq(0).html(), lastMonth);
    });

    it("year view's content method honors culture", function() {
        let today = new Date(2011, 9, 10),
            calendarInfo = kendo.getCulture("bg-BG").calendars.standard,
            firstMonth = calendarInfo.months.namesAbbr[0],
            lastMonth = calendarInfo.months.namesAbbr[11];

        div.html(calendar.views[1].content({
            date: today,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            culture: "bg-BG"
        }));

        assert.equal(div.find("tbody").find("tr:first").find("td").length, 4);
        assert.equal(div.find("tbody").find("td > span").length, 12);
        assert.equal(div.find("tbody").find("span:first").eq(0).html(), firstMonth);
        assert.equal(div.find("tbody").find("span:last").eq(0).html(), lastMonth);
    });

    it("year view renders does not render months not in range", function() {
        let today = new Date(2011, 9, 10),
            monthName = kendo.culture().calendar.months.namesAbbr[9];

        div.html(calendar.views[1].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("td").length, 12);
        assert.equal(div.find("tbody").find("td:not(.k-empty) span").length, 1);
        assert.equal(div.find("tbody").find("td:not(.k-empty) span").html(), monthName);
        assert.equal(div.find("tbody").find("td:not(.k-empty) span:first").html(), monthName);
    });

    it("year view renders cells with data-val", function() {
        let today = new Date(2011, 9, 10),
            value = today.getFullYear() + "/" + today.getMonth() + "/1",
            monthName = kendo.culture().calendar.months.namesAbbr[9];

        div.html(calendar.views[1].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("td:not(.k-empty) span").attr("data-kendo-value"), value);
    });

    it("decade title renders decade range title", function() {
        let today = new Date(2011, 9, 10);
        let min = new Date(2000, 9, 10);
        let max = new Date(2020, 9, 10);

        assert.equal(calendar.views[2].title(today, min, max), "2010-2019");
    });

    it("decade title renders decade range within min/max values", function() {
        let today = new Date(2015, 9, 10);
        let min = new Date(2013, 9, 10);
        let max = new Date(2018, 9, 10);

        assert.equal(calendar.views[2].title(today, min, max), "2013-2018");
    });

    it("decade view renders meta view  4x3 cells", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[2].content({
            date: today,
            showOtherMonthDays: true,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10)
        }));

        assert.equal(div.find("tbody").find("tr:first").find("td").length, 4);
        assert.equal(div.find("tbody").find("td > span").length, 10);
        assert.equal(div.find("tbody").find("span:first").html() + "", 2010 + "");
        assert.equal(div.find("tbody").find("span:last").html() + "", 2019 + "");
    });

    it("decade view renders only years in range", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[2].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("tr:first").find("td").length, 4);
        assert.equal(div.find("tbody").find("td:not(.k-empty) > span").length, 1);
        assert.equal(div.find("tbody").find("td:not(.k-empty) span").html(), "2011");
    });

    it("decade view renders cells with data-val", function() {
        let today = new Date(2011, 9, 10),
            value = "2011/0/1";

        div.html(calendar.views[2].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("td:not(.k-empty) > span").attr("data-kendo-value"), value);
    });

    it("century title renders century title", function() {
        let today = new Date(2011, 9, 10);
        let min = new Date(1900, 9, 10);
        let max = new Date(2100, 9, 10);

        assert.equal(calendar.views[3].title(today, min, max), "2000-2099");
    });

    it("century title renders century title within min/max values", function() {
        let today = new Date(2011, 9, 10);
        let min = new Date(2010, 9, 10);
        let max = new Date(2050, 9, 10);

        assert.equal(calendar.views[3].title(today, min, max), "2010-2050");
    });

    it("century view renders meta view  4x3 cells", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[3].content({
            date: today,
            showOtherMonthDays: true,
            min: new Date(1800, 10, 10),
            max: new Date(2220, 10, 10)
        }));

        assert.equal(div.find("tbody").find("tr:first").find("td").length, 4);
        assert.equal(div.find("tbody").find("td > span").length, 10);
        assert.equal(div.find("tbody").find("span:first").html(), "2000");
        assert.equal(div.find("tbody").find("span:last").html(), "2090");
    });

    it("century view renders only years in range", function() {
        let today = new Date(2011, 9, 10);

        div.html(calendar.views[3].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("td:not(.k-empty) > span").length, 1);
        assert.equal(div.find("tbody").find("td:not(.k-empty) span").html(), "2011");
    });

    it("century view does not render decades less then min", function() {
        let today = new Date(1910, 9, 10);

        div.html(calendar.views[3].content({
            date: today,
            min: new Date(1920, 0, 1),
            max: new Date(1950, 0, 1)
        }));

        assert.equal(div.find("tbody").find("td:first").children().length, 0);
    });

    it("century view renders cells with data-val", function() {
        let today = new Date(2011, 9, 10),
            value = "2010/0/1";

        div.html(calendar.views[3].content({
            date: today,
            min: today,
            max: today
        }));

        assert.equal(div.find("tbody").find("td:not(.k-empty) span").attr("data-kendo-value"), value);
    });

    it("_footer should render footer link", function() {
        let container = new kendo.ui.Calendar(div).element;

        assert.isOk(container.find(".k-calendar-footer")[0]);
        assert.isOk(container.find(".k-calendar-footer").children().length, 1);
        assert.isOk(container.find(".k-calendar-footer").children()[0].nodeName, "span");
        assert.isOk(container.find(".k-calendar-footer").children().html(), kendo.toString(new Date(), "D"));
        assert.isOk(container.find(".k-calendar-footer").children().attr("title"), kendo.toString(new Date(), "D"));
    });

    it("if no options.month then build template without WITH block", function() {
        let cal = new kendo.ui.Calendar(div);

        assert.isOk(cal.month.content.toString().indexOf("with") == -1);
    });

    it("set options.month should be used as template", function() {
        let cal = new kendo.ui.Calendar(div, { month: { content: ({ value }) => value } }),
            oldView = kendo.calendar.views[0].content, options;

        kendo.calendar.views[0].content = function(o) {
            options = o;
        };
        cal.navigate();

        assert.equal(options.content, cal.month.content);

        kendo.calendar.views[0].content = oldView;
    });

});
