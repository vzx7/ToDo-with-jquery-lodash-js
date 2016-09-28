;$(function(s){
	// The initial output of the task list. Welcome )
	ToDo.creatorTableTasks(true);
	/* Event handlers */

	// Handler click on field "имя задачи" 
	$('.todo-tbody').on('click','.td_title',function(event) { 
		var title = $(this).text().trim();
		if ($(this).find('input').length == 0) {
			$(this)
				.text('')
				.append(ToDo.generaterTemplate('input_temp',{title: title}))
				.find('input')
				.focus();
		}
	});
	// Handler keypress on button "Enter" on field "title" 
	$('.todo-tbody').on('keypress','.edit', function(event) { 
		if (event.keyCode == 13 || event.which == 13) {
			$('#save_update').click();
		}
	});
	// Handler click on the "Сохранить"
	$('#save_task').click(function(event) {
		var title = $('#new_task').val().trim(),
		tasks;
		event.preventDefault();

		if (title == '') { 
			$('#task_error').show();
			return;
		} else {
			$('#task_error').hide();
			ToDo.addTask(title);
		}
	});
	// Handler click on the "Список задач" (sorting)
	$('#tab_sort').click(function(event) {
        ToDo.creatorTableTasks($(this).hasClass('active-sort'));
	});
	// Handler click on the "Сохранить изминения"
	$('#save_update').click(function(event) {
		event.preventDefault();

		$('.todo-tbody tr').each(function(index, value) {
			var id = $(value).attr('id').replace('task_',''),
			edit;

			if ($(value).find('input.delete').prop('checked')) { 
				ToDo.customizerTasks(id, 'delete');
			} else {
				edit = $(value).find('input.edit');

				if (edit.length > 0) {
					ToDo.customizerTasks(id, 'edit', edit.val());
				}
				
				if (edit.length === 0 && $(value).find('input.complite').prop('checked')) {
					ToDo.customizerTasks(id, 'done', true);
				} else if (edit.length === 0 && !$(value).find('input.complite').prop('checked')) { 
					ToDo.customizerTasks(id, 'done', false);
				}
			} 
		});
		
		s.removeItem("tasks_jquery");
        s.setItem("tasks_jquery", JSON.stringify(ToDo.tasks));
        ToDo.creatorTableTasks(true);
	});
}(localStorage));
	 
