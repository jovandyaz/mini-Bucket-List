const source = $("#wonders-template").html()
const template = Handlebars.compile(source)

const render = function (wonders) {
    $("#wonders").empty()
    let newHtml = template({ wonders })
    $("#wonders").append(newHtml)
}

const fetch = function () {
    $.get("/wonders", function (response) {
        render(response)
    })
}

const addWonder = function () {
    let newWonder = $("#new-wonder-input").val()
    let newLocation = $("#new-location-input").val()
    //POST the newWonder to the server
    let data = { name: newWonder, location: newLocation }
    $.post('/wonder', data, function (response) {
        console.log("POST complete")
        console.log(response)
        fetch()
    })
}

const updateVisited = function (wonder) {
    $.ajax({
        url: `wonder/${wonder}`,
        method: "PUT",
        success: function (response) {
            console.log("PUT complete")
            console.log(response)
            fetch()
        }
    })
}

const deleteWonder = function (wonder) {
    $.ajax({
        url: `wonder/${wonder}`,
        method: "DELETE",
        success: function (response) {
            console.log("DELETE complete")
            console.log(response)
            fetch()
        }
    })
}

$("#wonders").on("click", ".deleteWonder", function () {
    let wonder = $(this).siblings(".name").text()
    console.log(`wonder: ${wonder}`)
    deleteWonder(wonder.split("-")[0].trim())
})

$("#wonders").on("click", ".visit", function(){
    let wonder = $(this).closest(".wonder").find(".name").text()
    console.log(`wonder: ${wonder}`)
    updateVisited(wonder.split("-")[0].trim())
})

fetch() //load the data on page load