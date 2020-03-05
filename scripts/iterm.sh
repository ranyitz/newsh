osascript <<EOF
tell application "iTerm2"
  tell current session of current window
    set new_session to split $__SPLIT_DIRECTION__ with same profile
      tell new_session
        delay 1
		    write text "cd $__CD__;$__CMD__"
      end tell
  end tell
end tell
EOF
