var mining_progress = 0;
var mining_interval;

$(document).on("turbolinks:load", function() {
  $("#app-container").on("click", ".mine-asteroid-btn", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    $.post("/asteroid/mine", { id: id }, function(data) {
      remove_target();
      if (mining_interval == null || mining_interval == false) {
        mining_interval = setInterval(function() {
          mining_progress = mining_progress + 2;
          $(".mining-progress").css("width", mining_progress + "%");
        }, 400);
      }
    }).fail(function(data) {
      if (data.responseJSON.error_message) {
        $.notify(data.responseJSON.error_message, { style: "alert" });
      }
    });
  });

  $("#app-container").on("click", ".stop-mining-btn", function(e) {
    e.preventDefault();
    $.post("/asteroid/stop_mine", function(data) {
      remove_target();
    });
  });
});

function update_asteroid_resources(resources, reset) {
  if ($(".asteroid-resources").length) {
    $(".asteroid-resources")
      .empty()
      .append(resources);
  }
  if (reset == true) {
    mining_progress = 0;
  }
}
