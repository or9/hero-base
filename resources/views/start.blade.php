@extends('app')

@section('content')
<dl>
@foreach($data as $char)
<dt>{{ $char->name }}</dt>
<dd>{{ $char->id }}</dd>
<dd>{{ $char->translit }}</dd>
@endforeach
</dl>

@endsection
